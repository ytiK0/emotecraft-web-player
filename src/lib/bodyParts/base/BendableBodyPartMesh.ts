import {
  type BufferGeometry, type Euler, type IUniform,
  type Material, Camera, Group,
  Scene, SkinnedMesh, WebGLRenderer
} from "three";
import {BodyPartGeometry} from "@/bodyParts/base/BodyPartGeometry.ts";
import type {TextureConfig} from "@/bodyParts";

const buildBendShader = (minMaxDiff: number) => {
  const minMaxFloat = minMaxDiff.toFixed(2);

  return `
  vec3 transformed = vec3( position );
  
  if (bendVert > 0.0) {
    float dyz = tan(mod(bendAxis, 2.0 * PI) / 2.0) * abs(transformed.x);
    float dyx = tan(mod(bend, 2.0 * PI) / 2.0) * abs(transformed.z);
    
    dyz = clamp(dyz, -${minMaxFloat}, ${minMaxFloat});
    dyx = clamp(dyx, -${minMaxFloat}, ${minMaxFloat});    
    
    if (transformed.x < 0.0 && transformed.z < 0.0) {
      transformed.y += (-dyz + dyx) * dir;
    }
    if (transformed.x > 0.0 && transformed.z < 0.0) {
      transformed.y += (dyz + dyx) * dir;
    }
    if (transformed.x < 0.0 && transformed.z > 0.0) {
      transformed.y += (-dyz - dyx) * dir;
    }
    if (transformed.x > 0.0 && transformed.z > 0.0) {
      transformed.y += (dyz - dyx) * dir;
    }
  } 

  #ifdef USE_ALPHAHASH
    vPosition = vec3( position );
  #endif
  `;
};

const shaderHeader =
`uniform float bendAxis;
uniform float bend;
uniform float dir;
attribute float bendVert;
`;

export class BendableBodyPartMesh extends SkinnedMesh<BodyPartGeometry> {
  private uniforms?: Record<string, IUniform>;
  private bendChildrenGroup?: Group;
  bendRotation: Euler;

  constructor(width: number, height: number, depth: number, textureConfig: TextureConfig, bendDirection: "top" | "bottom", material?: Material) {
    const geometry = new BodyPartGeometry(width, height, depth, textureConfig, true, bendDirection);

    if (material) {
      material = material.clone();
      material.onBeforeCompile = (shader) => {
        shader.uniforms.bendAxis = { value: 0 };
        shader.uniforms.bend = { value: 0 };
        shader.uniforms.dir = { value: bendDirection === "bottom" ? 1 : -1 };

        this.uniforms = shader.uniforms;

        shader.vertexShader = shader.vertexShader.replace(
          "#include <begin_vertex>",
          buildBendShader(width)
        );

        shader.vertexShader = shaderHeader + shader.vertexShader;
      };
    }


    super(geometry, material);

    this.add(geometry.baseBone!);
    this.bind(geometry.skeleton!);


    this.bendRotation = new Proxy(this.geometry.bendBone!.rotation, {
      set: (target, p:string , newValue , receiver) => {
        if (p === "x" && this.uniforms) {
          this.uniforms.bend.value = newValue;
        } else if (p === "z" && this.uniforms) {
          this.uniforms.bendAxis.value = newValue;
        }

        Reflect.set(target, p, newValue, receiver);
        return true;
      }
    });
  }

  setBendChildrenGroup(group: Group) {
    this.bendChildrenGroup = group;
  }

  onBeforeRender(renderer: WebGLRenderer, scene: Scene, camera: Camera, geometry: BufferGeometry, material: Material, group: Group) {
    super.onBeforeRender(renderer, scene, camera, geometry, material, group);

    if (this.bendChildrenGroup) {
      this.bendChildrenGroup.rotation.z = this.geometry.bendBone!.rotation.z;
      this.bendChildrenGroup.rotation.x = this.geometry.bendBone!.rotation.x;
    }
  }
}
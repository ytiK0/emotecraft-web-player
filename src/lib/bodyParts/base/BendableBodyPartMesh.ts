import {
  Bone,
  type BufferGeometry,
  Camera,
  type Euler,
  Group,
  type IUniform,
  type Material,
  Scene,
  Skeleton,
  SkinnedMesh,
  WebGLRenderer
} from "three";
import {BodyPartGeometry} from "@/bodyParts/base/BodyPartGeometry.ts";
import type {TextureConfig} from "@/bodyParts";
import {mergeGeometries} from "three/examples/jsm/utils/BufferGeometryUtils.js";

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

export class BendableBodyPartMesh extends SkinnedMesh {
  private uniforms?: Record<string, IUniform>;
  private bendChildrenGroup?: Group;
  bendRotation: Euler;
  private bendBone: Bone;

  constructor(
    width: number,
    height: number,
    depth: number,
    textureConfig: TextureConfig,
    overlayTextureConfig?: TextureConfig,
    material?: Material,
    bendDirection: "top" | "bottom" = "bottom",
  ) {
    const baseGeometry = new BodyPartGeometry(width, height, depth, textureConfig, true, bendDirection);
    const overlayGeometry = new BodyPartGeometry(width + 1, height + 1, depth + 1, overlayTextureConfig || textureConfig, true, bendDirection);

    const totalGeometry = mergeGeometries([baseGeometry, overlayGeometry]);

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

    super(totalGeometry, material);

    const bones = this.generateBones(width);
    this.attachSkeleton(bones);

    this.bendBone = bones[1];

    this.bendRotation = new Proxy(this.bendBone.rotation, {
      set: (target, p:string , newValue , receiver) => {
        if ((p === "x" || p === "_x") && this.uniforms) {
          this.uniforms.bend.value = newValue;
        } else if ((p === "z" || p === "_z") && this.uniforms) {
          this.uniforms.bendAxis.value = newValue;
        }

        Reflect.set(target, p, newValue, receiver);
        return true;
      }
    });
  }

  private attachSkeleton(bones: Bone[]) {
    const skeleton = new Skeleton(bones);

    this.add(bones[0]);
    this.bind(skeleton);
  }

  private generateBones(width: number) {
    const bones: Bone[] = [];

    const baseBone = new Bone();
    const bendBone = new Bone();

    baseBone.position.y = width / 2;
    bendBone.position.y = -width / 2;

    baseBone.add(bendBone);
    bones.push(baseBone, bendBone);
    return bones;
  }

  setBendChildrenGroup(group: Group) {
    this.bendChildrenGroup = group;
  }

  onBeforeRender(renderer: WebGLRenderer, scene: Scene, camera: Camera, geometry: BufferGeometry, material: Material, group: Group) {
    super.onBeforeRender(renderer, scene, camera, geometry, material, group);

    if (this.bendChildrenGroup) {
      this.bendChildrenGroup.rotation.z = this.bendBone.rotation.z;
      this.bendChildrenGroup.rotation.x = this.bendBone.rotation.x;
    }
  }
}
import {type IUniform, type Material, SkinnedMesh, type Vector2} from "three";
import {BodyPartGeometry} from "@/bodyParts/geometry/BodyPartGeometry.ts";

const bendShader = `
  vec3 transformed = vec3( position );
  
  if (bendVert > 0.0) {
    float dyz = tan(mod(bendAxis, 2.0 * PI) / 2.0) * abs(transformed.x);
    float dyx = tan(mod(bend, 2.0 * PI) / 2.0) * abs(transformed.z);
    
    dyz = clamp(dyz, -6.0, 6.0);
    dyx = clamp(dyx, -6.0, 6.0);    
    
    if (transformed.x < 0.0 && transformed.z < 0.0) {
      transformed.y += -dyz + dyx;
    }
    if (transformed.x > 0.0 && transformed.z < 0.0) {
      transformed.y += dyz + dyx;
    }
    if (transformed.x < 0.0 && transformed.z > 0.0) {
      transformed.y += -dyz - dyx;
    }
    if (transformed.x > 0.0 && transformed.z > 0.0) {
      transformed.y += dyz - dyx;
    }
  } 

  #ifdef USE_ALPHAHASH
    vPosition = vec3( position );
  #endif
`;

const shaderHeader = `uniform float bendAxis;
uniform float bend;
attribute float bendVert;
`;

export class BonedBodyPartMesh extends SkinnedMesh<BodyPartGeometry> {
  private uniforms?: Record<string, IUniform>;

  constructor(width: number, height: number, depth: number, textureStart: Vector2, material?: Material) {
    const geometry = new BodyPartGeometry(width, height, depth, textureStart, true);
    material = material?.clone();

    if (material) {
      material.onBeforeCompile = (shader) => {
        shader.uniforms.bendAxis = { value: 0 };
        shader.uniforms.bend = { value: 0 };

        this.uniforms = shader.uniforms;

        shader.vertexShader = shader.vertexShader.replace(
          "#include <begin_vertex>",
          bendShader
        );

        shader.vertexShader = shaderHeader + shader.vertexShader;
      };
    }


    super(geometry, material);

    this.add(geometry.baseBone!);
    this.bind(geometry.skeleton!);
  }

  setBendRotation(rotationValue: number) {
    this.geometry.bendBone!.rotation.x = rotationValue;
    if (this.uniforms) {
      this.uniforms.bend.value = rotationValue;
    }
  }

  setBendAxisRotation(rotationValue: number) {
    this.geometry.bendBone!.rotation.z = rotationValue;
    if (this.uniforms) {
      this.uniforms.bendAxis.value = rotationValue;
    }
  }
}
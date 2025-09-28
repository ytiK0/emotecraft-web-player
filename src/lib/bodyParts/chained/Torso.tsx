import {forwardRef} from "react";
import type {BodyPartProps, TextureConfig} from "@/bodyParts/types/bodyPart";
import {BodyPartBase} from "@/bodyParts/chained/BodyPartBase.tsx";
import {type Mesh, Vector2, Vector3, type Vector3Tuple} from "three";

const TORSO_SIZE = [8, 6, 4] as Vector3Tuple;
const TORSO_BEND_SIZE = TORSO_SIZE.map((val) => val - 0.01) as Vector3Tuple;
const TORSO_PIVOT_SHIFT = new Vector3(0, 3, 0);

const TORSO_TEXTURE_CONFIG: TextureConfig = {
  textureStart: new Vector2(16, 16),
  sidesStart: new Vector2(16, 16 + 10),
  textureSizes: new Vector3(...TORSO_SIZE)
};
export const Torso = forwardRef<Mesh, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  return <BodyPartBase
    ref={ref}
    pivotShift={TORSO_PIVOT_SHIFT}
    partSize={TORSO_SIZE}
    textureConfig={TORSO_TEXTURE_CONFIG}
    name={name}
    debug={debug}
    position={position}
  >
    { children }
  </BodyPartBase>;
});

const BEND_TEXTURE_CONFIG: TextureConfig = {
  textureStart: new Vector2(16, 16),
};
export const TorsoBend = forwardRef<Mesh, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  return <BodyPartBase
    ref={ref}
    pivotShift={TORSO_PIVOT_SHIFT}
    partSize={TORSO_BEND_SIZE}
    textureConfig={BEND_TEXTURE_CONFIG}
    name={name}
    debug={debug}
    position={position}
  >
    { children }
  </BodyPartBase>;
});
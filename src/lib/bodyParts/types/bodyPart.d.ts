import type {Euler, Vector2, Vector3, Vector3Tuple} from "three";
import type {ReactNode} from "react";

type BodyPartProps = {
  name: BodyPart | string;
  position?: Vector3;
  rotation?: Euler;
  debug?: boolean;
  children?: ReactNode;
}

type Sides = "top" | "bottom" | "back" | "front" | "left" | "right"

type BodyPartBaseProps = BodyPartProps & {
  pivotShift: Vector3 | Vector3Tuple,
  partSize: Vector3Tuple,
  textureConfig: TextureConfig,
  overlayTextureConfig?: TextureConfig,
  children?: ReactNode
}

type TextureConfig = {
  textureStart: Vector2,
  sidesStart?: Vector2,
  textureSizes?: Vector3,
  excludeSides?: Sides[]
}

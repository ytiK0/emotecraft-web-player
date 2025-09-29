import {Vector2, Vector3, type Vector3Tuple} from "three";
import {forwardRef} from "react";
import type {BodyPartProps, TextureConfig} from "@/bodyParts/types/bodyPart";
import {BendableBodyPartBase} from "@/bodyParts/bended/BendableBodyPartBase.tsx";
import type {DisposableBodyPartRepresentation} from "@/types/playerModel";

const armSize = [4, 12, 4] as Vector3Tuple;
const armGeometrySize = armSize.map((e) => e - 0.1) as Vector3Tuple;

const leftArmPivotPointShift = new Vector3(1, -4, 0);
const leftArmTextureConfig: TextureConfig = {
  textureStart: new Vector2(32, 64 - 16),
  textureSizes: new Vector3(...armSize)
};
const leftArmOverlayTextureConfig: TextureConfig = {
  textureStart: new Vector2(3 * 16, 64 - 16),
  textureSizes: new Vector3(...armSize)
};

export const BendableLeftArm = forwardRef<DisposableBodyPartRepresentation, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  return (
    <BendableBodyPartBase
      ref={ref}
      pivotShift={leftArmPivotPointShift}
      partSize={armGeometrySize}
      textureConfig={leftArmTextureConfig}
      overlayTextureConfig={leftArmOverlayTextureConfig}
      position={position}
      name={name}
      debug={debug}
    >
      { children }
    </BendableBodyPartBase>
  );
});

const rightArmPivotPointShift = new Vector3(-1, -4, 0);
const rightArmTextureConfig: TextureConfig = {
  textureStart: new Vector2(32 + 8, 16),
  textureSizes: new Vector3(...armSize)
};
const rightArmOverlayTextureConfig: TextureConfig = {
  textureStart: new Vector2(32 + 8, 32),
  textureSizes: new Vector3(...armSize)
};
export const BendableRightArm = forwardRef<DisposableBodyPartRepresentation, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  return (
    <BendableBodyPartBase
      ref={ref}
      pivotShift={rightArmPivotPointShift}
      partSize={armGeometrySize}
      textureConfig={rightArmTextureConfig}
      overlayTextureConfig={rightArmOverlayTextureConfig}
      position={position}
      name={name}
      debug={debug}
    >
      { children }
    </BendableBodyPartBase>
  );
});
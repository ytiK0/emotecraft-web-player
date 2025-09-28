import {Vector2, Vector3, type Vector3Tuple} from "three";
import {forwardRef} from "react";
import type {BodyPartProps, TextureConfig} from "@/bodyParts/types/bodyPart";
import {BendableBodyPartBase} from "@/bodyParts/bended/BendableBodyPartBase.tsx";
import type {DisposableBodyPartRepresentation} from "@/types/playerModel";

const LEG_SIZE = [4, 12, 4] as Vector3Tuple;

const LEFT_LEG_PIVOT_POINT_SHIFT = new Vector3(0,-6, 0);
const LEFT_LEG_TEXTURE_CONFIG: TextureConfig = {
  textureStart: new Vector2(16, 64 - 16)
};
export const BendableLeftLeg = forwardRef<DisposableBodyPartRepresentation, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  return (
    <BendableBodyPartBase
      ref={ref}
      pivotShift={LEFT_LEG_PIVOT_POINT_SHIFT}
      partSize={LEG_SIZE}
      textureConfig={LEFT_LEG_TEXTURE_CONFIG}
      position={position}
      name={name}
      debug={debug}
    >
      { children }
    </BendableBodyPartBase>
  );
});

const RIGHT_LEG_PIVOT_POINT_SHIFT = new Vector3(0,-6, 0);
const RIGHT_LEG_TEXTURE_CONFIG: TextureConfig = {
  textureStart: new Vector2(0, 16)
};
export const BendableRightLeg = forwardRef<DisposableBodyPartRepresentation, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  return (
    <BendableBodyPartBase
      ref={ref}
      pivotShift={RIGHT_LEG_PIVOT_POINT_SHIFT}
      partSize={LEG_SIZE}
      textureConfig={RIGHT_LEG_TEXTURE_CONFIG}
      position={position}
      name={name}
      debug={debug}
    >
      { children }
    </BendableBodyPartBase>
  );
});
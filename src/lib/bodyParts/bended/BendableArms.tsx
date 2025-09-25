import {Vector2, Vector3, type Vector3Tuple} from "three";
import {forwardRef} from "react";
import type {BodyPartProps} from "@/bodyParts/types/bodyPart";
import {BendableBodyPartBase} from "@/bodyParts/bended/BendableBodyPartBase.tsx";
import type {DisposableBodyPartRepresentation} from "@/types/playerModel";

const ARM_SIZE = [4, 12, 4] as Vector3Tuple;

const LEFT_ARM_PIVOT_POINT_SHIFT = new Vector3(1, -4, 0);
const LEFT_ARM_TEXTURE_START = new Vector2(32, 64 - 16);
export const BendableLeftArm = forwardRef<DisposableBodyPartRepresentation, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  return (
    <BendableBodyPartBase
      ref={ref}
      pivotShift={LEFT_ARM_PIVOT_POINT_SHIFT}
      partSize={ARM_SIZE}
      textureStart={LEFT_ARM_TEXTURE_START}
      position={position}
      name={name}
      debug={debug}
    >
      { children }
    </BendableBodyPartBase>
  );
});

const RIGHT_ARM_PIVOT_POINT_SHIFT = new Vector3(-1, -4, 0);
const RIGHT_ARM_TEXTURE_START = new Vector2(32+8, 16);
export const BendableRightArm = forwardRef<DisposableBodyPartRepresentation, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  return (
    <BendableBodyPartBase
      ref={ref}
      pivotShift={RIGHT_ARM_PIVOT_POINT_SHIFT}
      partSize={ARM_SIZE}
      textureStart={RIGHT_ARM_TEXTURE_START}
      position={position}
      name={name}
      debug={debug}
    >
      { children }
    </BendableBodyPartBase>
  );
});
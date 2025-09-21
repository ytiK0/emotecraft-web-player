import {Vector2, Vector3, type Vector3Tuple} from "three";
import {forwardRef} from "react";
import type {BodyPartProps} from "@/bodyParts/bodyPart";
import {BodyPartBase} from "@/bodyParts/BodyPartBase.tsx";
import type {BodyPartRepresentation} from "@/player";
import {useCubedBend} from "@/hooks/useCubedBend.ts";

const ARM_SIZE = [4, 6, 4] as Vector3Tuple;
const ARM_BEND_SIZE = ARM_SIZE.map((val) => val - 0.01) as Vector3Tuple;
const ARM_BEND_PIVOT_POINT_SHIFT = new Vector3(0, -3, 0);
const LEFT_BEND_POSITION = new Vector3(1, -4, 0);

const LEFT_ARM_PIVOT_POINT_SHIFT = new Vector3(1, -1, 0);
const LEFT_ARM_TEXTURE_START = new Vector2(32, 64 - 16);
const LEFT_ARM_BEND_TEXTURE_START = new Vector2(32, 64 - 10);
export const LeftArm = forwardRef<BodyPartRepresentation | undefined, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  const { baseRef, bendRef } = useCubedBend(ref);

  return (
    <BodyPartBase
      ref={baseRef}
      pivotShift={LEFT_ARM_PIVOT_POINT_SHIFT}
      partSize={ARM_BEND_SIZE}
      textureStart={LEFT_ARM_TEXTURE_START}
      name={name}
      debug={debug}
      position={position}
    >
      <BodyPartBase
        ref={bendRef}
        pivotShift={ARM_BEND_PIVOT_POINT_SHIFT}
        partSize={ARM_SIZE}
        textureStart={LEFT_ARM_BEND_TEXTURE_START}
        name={`${name}_bend`}
        debug={debug}
        position={LEFT_BEND_POSITION}
      >
        { children }
      </BodyPartBase>
    </BodyPartBase>
  );
});

const RIGHT_BEND_POSITION = new Vector3(-1, -4, 0);

const RIGHT_ARM_PIVOT_POINT_SHIFT = new Vector3(-1, -1, 0);
const RIGHT_ARM_TEXTURE_START = new Vector2(32 + 8,16);
const RIGHT_ARM_BEND_TEXTURE_START = new Vector2(32 + 8,16 + 6);
export const RightArm = forwardRef<BodyPartRepresentation | undefined, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  const { baseRef, bendRef } = useCubedBend(ref);

  return (
    <BodyPartBase
      ref={baseRef}
      pivotShift={RIGHT_ARM_PIVOT_POINT_SHIFT}
      partSize={ARM_SIZE}
      textureStart={RIGHT_ARM_TEXTURE_START}
      name={name}
      debug={debug}
      position={position}
    >
      <BodyPartBase
        ref={bendRef}
        pivotShift={ARM_BEND_PIVOT_POINT_SHIFT}
        partSize={ARM_BEND_SIZE}
        textureStart={RIGHT_ARM_BEND_TEXTURE_START}
        name={`${name}_bend`}
        debug={debug}
        position={RIGHT_BEND_POSITION}
      >
        { children }
      </BodyPartBase>
    </BodyPartBase>
  );
});
import {Vector2, Vector3, type Vector3Tuple} from "three";
import {forwardRef} from "react";
import type {BodyPartProps} from "@/bodyParts/types/bodyPart";
import {BodyPartBase} from "@/bodyParts/chained/BodyPartBase.tsx";
import {useCubedLimb} from "@/hooks/useCubedLimb.ts";
import type {DisposableBodyPartRepresentation} from "@/types/playerModel";

const LEG_SIZE = [4, 6, 4] as Vector3Tuple;
const LEG_BEND_SIZE = LEG_SIZE.map((val) => val - 0.01) as Vector3Tuple;
const LEG_PIVOT_POINT_SHIFT = new Vector3(0, -3, 0);
const BEND_POSITION = new Vector3(0, -6, 0);

const LEFT_LEG_TEXTURE_START = new Vector2(16, 64 - 16);
const LEFT_LEG_BEND_TEXTURE_START = new Vector2(16, 64 - 10);
export const LeftLeg = forwardRef<DisposableBodyPartRepresentation | undefined, BodyPartProps>(({
  children,
  name,
  debug,
  position
}: BodyPartProps, ref) => {
  const { baseRef, bendRef } = useCubedLimb(ref);

  return (
    <BodyPartBase
      ref={baseRef}
      pivotShift={LEG_PIVOT_POINT_SHIFT}
      partSize={LEG_SIZE}
      textureStart={LEFT_LEG_TEXTURE_START}
      name={name}
      debug={debug}
      position={position}
    >
      <BodyPartBase
        ref={bendRef}
        pivotShift={LEG_PIVOT_POINT_SHIFT}
        partSize={LEG_BEND_SIZE}
        textureStart={LEFT_LEG_BEND_TEXTURE_START}
        name={`${name}_bend`}
        debug={debug}
        position={BEND_POSITION}
      >
        { children }
      </BodyPartBase>
    </BodyPartBase>
  );
});

const RIGHT_LEG_TEXTURE_START = new Vector2(0, 16);
const RIGHT_LEG_BEND_TEXTURE_START = new Vector2(0,16+6);
export const RightLeg = forwardRef<DisposableBodyPartRepresentation | undefined, BodyPartProps>(({
  children,
  name,
  debug,
  position
}: BodyPartProps, ref) => {
  const { baseRef, bendRef } = useCubedLimb(ref);

  return (
    <BodyPartBase
      ref={baseRef}
      pivotShift={LEG_PIVOT_POINT_SHIFT}
      partSize={LEG_SIZE}
      textureStart={RIGHT_LEG_TEXTURE_START}
      name={name}
      debug={debug}
      position={position}
    >
      <BodyPartBase
        ref={bendRef}
        pivotShift={LEG_PIVOT_POINT_SHIFT}
        partSize={LEG_BEND_SIZE}
        textureStart={RIGHT_LEG_BEND_TEXTURE_START}
        name={`${name}_bend`}
        debug={debug}
        position={BEND_POSITION}
      >
        { children }
      </BodyPartBase>
    </BodyPartBase>
  );
});
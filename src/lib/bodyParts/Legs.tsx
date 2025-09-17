import {type Mesh, Vector2, Vector3, type Vector3Tuple} from "three";
import {forwardRef} from "react";
import type {BodyPartProps} from "@/bodyParts/bodyPart";
import {BodyPartBase} from "@/bodyParts/BodyPartBase.tsx";

const LEG_SIZE = [4, 6, 4] as Vector3Tuple;
const LEG_BEND_SIZE = LEG_SIZE.map((val) => val - 0.01) as Vector3Tuple;
const LEG_PIVOT_POINT_SHIFT = new Vector3(0, -3, 0);
const BEND_POSITION = new Vector3(0, -6, 0);

const LEFT_LEG_TEXTURE_START = new Vector2(16, 64 - 16);
const LEFT_LEG_BEND_TEXTURE_START = new Vector2(16, 64 - 10);
export const LeftLeg = forwardRef<Mesh, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  return (
    <BodyPartBase
      ref={ref}
      pivotShift={LEG_PIVOT_POINT_SHIFT}
      partSize={LEG_SIZE}
      textureStart={LEFT_LEG_TEXTURE_START}
      name={name}
      debug={debug}
      position={position}
    >
      <BodyPartBase
        ref={ref}
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
export const RightLeg = forwardRef<Mesh>(({children, name, debug, position}: BodyPartProps, ref) => {
  return (
    <BodyPartBase
      ref={ref}
      pivotShift={LEG_PIVOT_POINT_SHIFT}
      partSize={LEG_SIZE}
      textureStart={RIGHT_LEG_TEXTURE_START}
      name={name}
      debug={debug}
      position={position}
    >
      <BodyPartBase
        ref={ref}
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
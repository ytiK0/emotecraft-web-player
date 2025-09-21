import {type Mesh, Vector2, Vector3, type Vector3Tuple} from "three";
import {forwardRef, useImperativeHandle, useRef} from "react";
import type {BodyPartProps} from "@/bodyParts/bodyPart";
import {BodyPartBase} from "@/bodyParts/BodyPartBase.tsx";
import type {BodyPartRepresentation} from "@/player";

const PIVOT_POINT_SHIFT = new Vector3(0, 4, 0);
const HEAD_SIZE = [8, 8, 8] as Vector3Tuple;
const TEXTURE_START = new Vector2(0, 0);

export const Head = forwardRef<BodyPartRepresentation | undefined, BodyPartProps>(({ name, debug, children, position }: BodyPartProps, ref) => {
  const headRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => {
    if (headRef.current === null) {
      return undefined;
    }

    const head = headRef.current;

    return {
      name: name,
      uuid: head.uuid,
      position: head.position,
      rotation: head.rotation,
      scale: head.scale
    };
  });

  return <BodyPartBase
    ref={headRef}
    pivotShift={PIVOT_POINT_SHIFT}
    partSize={HEAD_SIZE}
    textureStart={TEXTURE_START}
    name={name}
    debug={debug}
    position={position}
  >
    { children }
  </BodyPartBase>;
});
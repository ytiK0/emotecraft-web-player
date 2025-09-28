import {type Mesh, Vector2, Vector3, type Vector3Tuple} from "three";
import {forwardRef, useImperativeHandle, useRef} from "react";
import type {BodyPartProps, TextureConfig} from "@/bodyParts/types/bodyPart";
import {BodyPartBase} from "@/bodyParts/chained/BodyPartBase.tsx";
import type {DisposableBodyPartRepresentation} from "@/types/playerModel";

const PIVOT_POINT_SHIFT = new Vector3(0, 4, 0);
const HEAD_SIZE = [8.01, 8.01, 8.01] as Vector3Tuple;
const TEXTURE_CONFIG: TextureConfig = {
  textureStart: new Vector2(0, 0),
  textureSizes: new Vector3(8,8,8)
};

export const Head = forwardRef<DisposableBodyPartRepresentation | undefined, BodyPartProps>(({ name, debug, children, position }: BodyPartProps, ref) => {
  const headRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => {
    if (headRef.current === null) {
      return undefined;
    }

    const head = headRef.current;
    const representation = {
      name: name,
      uuid: head.uuid,
      position: head.position,
      rotation: head.rotation,
      scale: head.scale
    };

    return { representation, bindMeshes: [head] };
  });

  return <BodyPartBase
    ref={headRef}
    pivotShift={PIVOT_POINT_SHIFT}
    partSize={HEAD_SIZE}
    textureConfig={TEXTURE_CONFIG}
    name={name}
    debug={debug}
    position={position}
  >
    { children }
  </BodyPartBase>;
});
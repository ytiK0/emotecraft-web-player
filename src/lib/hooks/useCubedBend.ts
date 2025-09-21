import {type ForwardedRef, useImperativeHandle, useRef} from "react";
import type {Mesh} from "three";
import type {BodyPartRepresentation} from "@/player";

/**
 * Bind to passed ref built BodyPartRepresentation, to work correctly you should bind both output refs
 * to your body part meshes
 * @param ref
 */
export function useCubedBend(ref: ForwardedRef<BodyPartRepresentation | undefined>) {
  const baseRef = useRef<Mesh>(null);
  const bendRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => {
    if (baseRef.current === null || bendRef.current === null) {
      return undefined;
    }

    const base = baseRef.current;
    const bend = bendRef.current;

    return {
      name: base.name,
      uuid: base.uuid,
      position: base.position,
      rotation: base.rotation,
      scale: base.scale,
      bendRotation: bend.rotation,
    };
  });

  return { baseRef, bendRef };
}
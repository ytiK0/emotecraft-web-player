import {type ForwardedRef, useImperativeHandle, useRef} from "react";
import type {Mesh} from "three";
import type {DisposableBodyPartRepresentation} from "@/types/playerModel";

/**
 * Bind to passed ref built BodyPartRepresentation, to work correctly you should bind both output refs
 * to your body part meshes
 * @param ref
 */
export function useCubedLimb(ref: ForwardedRef<DisposableBodyPartRepresentation | undefined>) {
  const baseRef = useRef<Mesh>(null);
  const bendRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => {
    if (baseRef.current === null || bendRef.current === null) {
      return undefined;
    }

    const base = baseRef.current;
    const bend = bendRef.current;

    const representation = {
      name: base.name,
      uuid: base.uuid,
      position: base.position,
      rotation: base.rotation,
      scale: base.scale,
      bendRotation: bend.rotation,
    };

    return { representation, bindMeshes: [base, bend] };
  });

  return { baseRef, bendRef };
}
import {useCallback, useRef} from "react";
import type {BodyPartRepresentation, DisposableBodyPartRepresentation, PlayerModelMesh} from "@/types/playerModel";
import {warn} from "@/utils/warn.ts";

export function useModelMeshes() {
  const meshes = useRef<Partial<PlayerModelMesh> & Record<string, BodyPartRepresentation>>({});

  const setRepresentationRef = useCallback((disposableRepresentation: DisposableBodyPartRepresentation) => {
    if (!disposableRepresentation) {
      return;
    }

    const { representation, bindMeshes } = disposableRepresentation;

    if (representation.name === "") {
      warn(`${representation.uuid} mesh does not have name, it will not assign in ref, set name or remove from scene`);
    } else if (representation.name in meshes.current) {
      if (representation.uuid !== meshes.current[representation.name].uuid) {
        warn(`${representation.uuid} mesh already exist with name: ${representation.name}, it will not assign in ref, rename it or remove from scene`);
      }
    } else {
      meshes.current[representation.name] = representation;


      if (bindMeshes) {
        for (const bindMesh of bindMeshes) {
          const onRemove = () => {
            delete meshes.current[bindMesh.name];
            bindMesh.removeEventListener("removed", onRemove);
          };

          bindMesh.addEventListener("removed", onRemove);
        }

      }
    }

  }, []);

  return [meshes, setRepresentationRef] as const;
}
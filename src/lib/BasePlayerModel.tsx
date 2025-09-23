import {Head, LeftArm, LeftLeg, RightArm, RightLeg, Torso, TorsoBend} from "@/bodyParts";
import {partsDefaultPosition} from "@/partsDefaultPosition.ts";
import {forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef} from "react";
import {warn} from "@/utils/warn.ts";
import type {
  BodyPartRepresentation,
  DisposableBodyPartRepresentation,
  PlayerModelMesh,
  PlayerModelProps
} from "@/player";
import {SkinMaterialProvider} from "@/contexts/SkinMaterial";
import {useCubedLimb} from "@/hooks/useCubedLimb.ts";

const {
  head,
  torso,
  torso_bend,
  leftArm,
  rightArm,
  leftLeg,
  rightLeg
} = partsDefaultPosition;

export const BasePlayerModel = forwardRef<PlayerModelMesh, PlayerModelProps>(({ position, debug }, ref) => {
  const modelPosition = useMemo(() => {
    if (torso && position) {
      return torso.clone().add(position);
    }

    return torso;
  }, [position]);

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

  useImperativeHandle(ref, () => meshes.current as PlayerModelMesh);

  const torsoRepresentationRef = useRef<DisposableBodyPartRepresentation>(null);

  const { baseRef, bendRef } = useCubedLimb(torsoRepresentationRef);

  useEffect(() => {
    if (torsoRepresentationRef.current) {
      meshes.current["torso"] = torsoRepresentationRef.current.representation;
    }
  }, []);

  return (
    <SkinMaterialProvider skinSrc={"/skin.png"}>
      <Torso ref={baseRef} name={"torso"} position={modelPosition} debug={debug} >
        <TorsoBend ref={bendRef} name={"torso_bend"} position={torso_bend} debug={debug} >
          <Head ref={setRepresentationRef} name={"head"} position={head} debug={debug} />
          <LeftArm ref={setRepresentationRef} name={"leftArm"} position={leftArm} debug={debug} />
          <RightArm ref={setRepresentationRef} name={"rightArm"} position={rightArm} debug={debug} />
        </TorsoBend>

        <LeftLeg ref={setRepresentationRef} name={"leftLeg"} position={leftLeg} debug={debug} />
        <RightLeg ref={setRepresentationRef} name={"rightLeg"} position={rightLeg} debug={debug} />
      </Torso>
    </SkinMaterialProvider>
  );
});

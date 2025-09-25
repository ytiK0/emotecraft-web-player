import {Head, LeftArm, LeftLeg, RightArm, RightLeg, Torso, TorsoBend} from "@/bodyParts/chained";
import {partsDefaultPosition} from "@/partsDefaultPosition.ts";
import {forwardRef, useEffect, useImperativeHandle, useMemo, useRef} from "react";
import type {
  DisposableBodyPartRepresentation,
  PlayerModelMesh,
  PlayerModelProps
} from "@/types/playerModel";
import {SkinMaterialProvider} from "@/contexts/SkinMaterial";
import {useCubedLimb} from "@/hooks/useCubedLimb.ts";
import {useModelMeshes} from "@/hooks/useModelMeshes.ts";

const {
  head,
  torso,
  torso_bend,
  leftArm,
  rightArm,
  leftLeg,
  rightLeg
} = partsDefaultPosition;

export const ChainedPlayerModel = forwardRef<PlayerModelMesh, PlayerModelProps>(({ position, debug }, ref) => {
  const modelPosition = useMemo(() => {
    if (torso && position) {
      return torso.clone().add(position);
    }

    return torso;
  }, [position]);

  const [meshes, setRepresentationRef] = useModelMeshes();

  useImperativeHandle(ref, () => meshes.current as PlayerModelMesh);

  const torsoRepresentationRef = useRef<DisposableBodyPartRepresentation>(null);

  const { baseRef, bendRef } = useCubedLimb(torsoRepresentationRef);

  useEffect(() => {
    if (torsoRepresentationRef.current) {
      meshes.current["torso"] = torsoRepresentationRef.current.representation;
    }
  }, [meshes]);

  return (
    <SkinMaterialProvider skinSrc={"/skin.png"}>
          <Head ref={setRepresentationRef} name={"head"} position={head} debug={debug} />
      <Torso ref={baseRef} name={"torso"} position={modelPosition} debug={debug} >
        <TorsoBend ref={bendRef} name={"torso_bend"} position={torso_bend} debug={debug} >
          <LeftArm ref={setRepresentationRef} name={"leftArm"} position={leftArm} debug={debug} />
          <RightArm ref={setRepresentationRef} name={"rightArm"} position={rightArm} debug={debug} />
        </TorsoBend>

        <LeftLeg ref={setRepresentationRef} name={"leftLeg"} position={leftLeg} debug={debug} />
        <RightLeg ref={setRepresentationRef} name={"rightLeg"} position={rightLeg} debug={debug} />
      </Torso>
    </SkinMaterialProvider>
  );
});

import {Head, LeftArm, LeftLeg, RightArm, RightLeg, Torso, TorsoBend} from "@/bodyParts";
import {defaultPose} from "@/defaults.ts";
import {forwardRef, useCallback, useEffect, useImperativeHandle, useRef} from "react";
import {warn} from "@/utils/warn.ts";
import type {BodyPartRepresentation, PlayerModelMesh, Pose} from "@/player";
import {SkinMaterialProvider} from "@/contexts/SkinMaterial";
import {useCubedBend} from "@/hooks/useCubedBend.ts";

interface PlayerModelProps {
  pose?: Pose;
}

export const BasePlayerModel = forwardRef<PlayerModelMesh>(({ pose }: PlayerModelProps, ref) => {
  const {
    head,
    torso, torso_bend,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg
  } = pose || defaultPose;

  const meshes = useRef<Partial<PlayerModelMesh> & Record<string, BodyPartRepresentation>>({});

  const setRepresentationRef = useCallback((mesh: BodyPartRepresentation) => {
    if (mesh) {
      if (mesh.name === "") {
        warn(`${mesh.uuid} mesh does not have name, it will not assign in ref, set name or remove from scene`);
      } else if (mesh.name in meshes.current) {
        if (mesh.uuid !== meshes.current[mesh.name].uuid) {
          warn(`${mesh.uuid} mesh already exist with name: ${mesh.name}, it will not assign in ref, rename it or remove from scene`);
        }
      } else {
        meshes.current[mesh.name] = mesh;

        // const onRemove = () => {
        //   delete meshes.current[mesh.name];
        //   mesh.removeEventListener("removed", onRemove);
        // };
        //
        // mesh.addEventListener("removed", onRemove);
      }
    }
  }, []);

  useImperativeHandle(ref, () => meshes.current as PlayerModelMesh);

  const torsoRepresentationRef = useRef<BodyPartRepresentation>(null);

  const { baseRef, bendRef } = useCubedBend(torsoRepresentationRef);

  useEffect(() => {
    if (torsoRepresentationRef.current) {
      meshes.current["torso"] = torsoRepresentationRef.current;
    }
  }, []);

  return (
    <SkinMaterialProvider skinSrc={"/skin.png"}>
      <Torso ref={baseRef} name={"torso"} debug {...torso}>
        <TorsoBend ref={bendRef} name={"torso_bend"} debug {...torso_bend}>
          <Head ref={setRepresentationRef} name={"head"} debug {...head} />
          <LeftArm ref={setRepresentationRef} name={"leftArm"} debug {...leftArm} />
          <RightArm ref={setRepresentationRef} name={"rightArm"} debug {...rightArm} />
        </TorsoBend>

        <LeftLeg ref={setRepresentationRef} name={"leftLeg"} debug {...leftLeg} />
        <RightLeg ref={setRepresentationRef} name={"rightLeg"} debug {...rightLeg} />
      </Torso>
    </SkinMaterialProvider>
  );
});

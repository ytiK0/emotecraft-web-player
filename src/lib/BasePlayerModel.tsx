import {Head, LeftArm, LeftLeg, RightArm, RightLeg, Torso, TorsoBend} from "@/bodyParts";
import {defaultPose} from "@/defaults.ts";
import type {Mesh} from "three";
import {forwardRef, useCallback, useImperativeHandle, useRef} from "react";
import {warn} from "@/utils/warn.ts";
import type {PlayerModelMesh, Pose} from "@/player";
import {SkinMaterialProvider} from "@/contexts/SkinMaterial";

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

  const meshes = useRef<Partial<PlayerModelMesh> & Record<string, Mesh>>({});

  const setMeshRef = useCallback((mesh: Mesh) => {
    if (mesh) {
      if (mesh.name === "") {
        warn(`${mesh.uuid} mesh does not have name, it will not assign in ref, set name or remove from scene`);
      } else if (mesh.name in meshes.current) {
        if (mesh.uuid !== meshes.current[mesh.name].uuid) {
          warn(`${mesh.uuid} mesh already exist with name: ${mesh.name}, it will not assign in ref, rename it or remove from scene`);
        }
      } else {
        meshes.current[mesh.name] = mesh;

        const onRemove = () => {
          delete meshes.current[mesh.name];
          mesh.removeEventListener("removed", onRemove);
        };

        mesh.addEventListener("removed", onRemove);
      }
    }
  }, []);

  useImperativeHandle(ref, () => meshes.current as PlayerModelMesh);

  return (
    <SkinMaterialProvider skinSrc={"/skin.png"}>
      <Torso ref={setMeshRef} name={"torso"} {...torso}>
        <TorsoBend ref={setMeshRef} name={"torso_bend"} {...torso_bend}>
          <Head ref={setMeshRef} name={"head"} {...head} />
          <LeftArm ref={setMeshRef} name={"leftArm"} {...leftArm} />
          <RightArm ref={setMeshRef} name={"rightArm"} {...rightArm} />
        </TorsoBend>

        <LeftLeg ref={setMeshRef} name={"leftLeg"} {...leftLeg} />
        <RightLeg ref={setMeshRef} name={"rightLeg"} {...rightLeg} />
      </Torso>
    </SkinMaterialProvider>
  );
});

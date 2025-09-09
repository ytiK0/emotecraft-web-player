import {Head, LeftArm, LeftArmBend, LegBend, RightArm, RightArmBend, TorsoBend} from "@/bodyParts";
import type {BodyPart, BodyPartProps} from "@/bodyParts/bodyPart";
import {defaultPose} from "@/defaults.ts";
import type {Mesh} from "three";
import {forwardRef, useCallback, useImperativeHandle, useRef} from "react";
import {warn} from "@/utils/warn.ts";
import {useFrame} from "@react-three/fiber";

export type Pose = Partial<Record<BodyPart, BodyPartProps>>;
export type BasePlayerModelMesh = Record<BodyPart, Mesh>

interface PlayerModelProps {
  pose?: Pose;
}

export const BasePlayerModel = forwardRef<BasePlayerModelMesh>(({ pose }: PlayerModelProps, ref) => {
  const {
    head,
    torso, torso_bend,
    leftArm, leftArm_bend,
    rightArm, rightArm_bend,
    leftLeg, leftLeg_bend,
    rightLeg, rightLeg_bend
  } = pose || defaultPose;

  const meshes = useRef<Partial<BasePlayerModelMesh> & Record<string, Mesh>>({});

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

  useFrame((_, delta) => {
    meshes.current.head?.rotateZ(delta * 2.5);
    meshes.current.head?.rotateX(delta * 0.5);
    meshes.current.head?.rotateY(delta);
  });

  useImperativeHandle(ref, () => meshes.current as BasePlayerModelMesh);

  return (
    <TorsoBend ref={setMeshRef} name={"torso"} {...torso}>
      <TorsoBend ref={setMeshRef} name={"torso_bend"} {...torso_bend}>
        <Head ref={setMeshRef} name={"head"} {...head} />
        <LeftArm ref={setMeshRef} name={"leftArm"} {...leftArm}>
          <LeftArmBend ref={setMeshRef} name={"leftArm_bend"} {...leftArm_bend} />
        </LeftArm>
        <RightArm ref={setMeshRef} name={"rightArm"} {...rightArm}>
          <RightArmBend ref={setMeshRef} name={"rightArm_bend"} {...rightArm_bend} />
        </RightArm>
      </TorsoBend>

      <LegBend ref={setMeshRef} name={"leftLeg"} {...leftLeg}>
        <LegBend ref={setMeshRef} name={"leftLeg_bend"} {...leftLeg_bend} />
      </LegBend>
      <LegBend ref={setMeshRef} name={"rightLeg"} {...rightLeg}>
        <LegBend ref={setMeshRef} name={"rightLeg_bend"} {...rightLeg_bend} />
      </LegBend>
    </TorsoBend>
  );
});

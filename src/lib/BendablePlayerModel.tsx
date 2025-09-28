import {forwardRef, useImperativeHandle} from "react";
import {BendableLeftLeg, BendableRightLeg, BendableTorso, BendableRightArm, BendableLeftArm} from "@/bodyParts/bended";
import {Vector3, type Vector3Tuple} from "three";
import {Head} from "@/bodyParts/chained";
import type {DisposableBodyPartRepresentation, PlayerModelMesh} from "@/types/playerModel";
import {useModelMeshes} from "@/hooks/useModelMeshes.ts";

const torsoPosition = new Vector3(0, 12, 0);
const headPosition = new Vector3(0,6, 0);
const leftArmPosition = new Vector3(5, 4, 0);
const rightArmPosition = new Vector3(-5, 4, 0);
const leftLegPosition = new Vector3(2,0,0);
const rightLegPosition = new Vector3(-2,0,0);


const TorsoBendBind = forwardRef<DisposableBodyPartRepresentation>((_, setMeshRef) => {
  return (
    <>
      <Head ref={setMeshRef} position={headPosition} name={"head"} />
      <BendableLeftArm ref={setMeshRef} position={leftArmPosition} name={"leftArm"} />
      <BendableRightArm ref={setMeshRef} position={rightArmPosition} name={"rightArm"} />
    </>
  );
});

export const BendablePlayerModel = forwardRef<PlayerModelMesh, { position?: Vector3 | Vector3Tuple }>(({ position }, ref) => {
  const [meshesRef, setMeshRef] = useModelMeshes();

  useImperativeHandle(ref, () => meshesRef.current as PlayerModelMesh,);
  return (
    <group position={position}>
      <BendableTorso ref={setMeshRef} position={torsoPosition} name={"torso"}
                     bendChildren={<TorsoBendBind ref={setMeshRef} />}
      >
        <BendableLeftLeg ref={setMeshRef} position={leftLegPosition} name={"leftLeg"} />
        <BendableRightLeg ref={setMeshRef} position={rightLegPosition} name={"rightLeg"} />
      </BendableTorso>

    </group>
  );
});
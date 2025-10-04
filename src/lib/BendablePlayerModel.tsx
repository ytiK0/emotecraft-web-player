import {forwardRef, useImperativeHandle} from "react";
import {BendableLeftLeg, BendableRightLeg, BendableTorso, BendableRightArm, BendableLeftArm, Head} from "@/bodyParts/bendable";
import {Vector3} from "three";
import type {DisposableBodyPartRepresentation, PlayerModelMesh, PlayerModelProps} from "@/types/playerModel";
import {useModelMeshes} from "@/hooks/useModelMeshes";

const torsoPosition = new Vector3(0, 12, 0);
const headPosition = new Vector3(0,6, 0);
const leftArmPosition = new Vector3(5, 4, 0);
const rightArmPosition = new Vector3(-5, 4, 0);
const leftSlimArmPosition = new Vector3(4.5, 4, 0);
const rightSlimArmPosition = new Vector3(-4.5, 4, 0);
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

const TorsoBendBindSlim = forwardRef<DisposableBodyPartRepresentation>((_, setMeshRef) => {
  return (
    <>
      <Head ref={setMeshRef} position={headPosition} name={"head"} />
      <BendableLeftArm ref={setMeshRef} position={leftSlimArmPosition} name={"leftArm"} isSlim />
      <BendableRightArm ref={setMeshRef} position={rightSlimArmPosition} name={"rightArm"} isSlim />
    </>
  );
});

export const BendablePlayerModel = forwardRef<PlayerModelMesh, PlayerModelProps>(({ position, isSlimModel }, ref) => {
  const [meshesRef, setMeshRef] = useModelMeshes();

  useImperativeHandle(ref, () => meshesRef.current as PlayerModelMesh);

  const bendChildren = isSlimModel ? <TorsoBendBindSlim ref={setMeshRef} /> : <TorsoBendBind ref={setMeshRef} />;

  return (
    <group position={position}>
      <BendableTorso
        name={"torso"}
        ref={setMeshRef}
        position={torsoPosition}
        bendChildren={bendChildren}
      >
        <BendableLeftLeg ref={setMeshRef} position={leftLegPosition} name={"leftLeg"} />
        <BendableRightLeg ref={setMeshRef} position={rightLegPosition} name={"rightLeg"} />
      </BendableTorso>

    </group>
  );
});
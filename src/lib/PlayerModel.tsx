import {Head, LeftArm, LeftArmBend, LegBend, RightArm, RightArmBend, TorsoBend} from "@/bodyParts";
import type {BodyPart, BodyPartProps} from "@/bodyParts/bodyPart";
import {defaultPose, defaultPositions} from "@/defaults.ts";

export type Pose = Partial<Record<BodyPart, BodyPartProps>>;

interface PlayerModelProps {
  pose?: Pose;
}


export default function PlayerModel({ pose }: PlayerModelProps) {
  const {
    head,
    torso, torso_bend,
    leftArm, leftArm_bend,
    rightArm, rightArm_bend,
    leftLeg, leftLeg_bend,
    rightLeg, rightLeg_bend
  } = pose || defaultPose;

  return (
    <TorsoBend {...torso} position={defaultPositions.torso}>
      <TorsoBend {...torso_bend} position={defaultPositions.torso_bend}>
        <Head {...head} position={defaultPositions.head} />
        <LeftArm {...leftArm} position={defaultPositions.leftArm} >
          <LeftArmBend {...leftArm_bend} position={defaultPositions.leftArm_bend}  />
        </LeftArm>
        <RightArm {...rightArm} position={defaultPositions.rightArm} >
          <RightArmBend {...rightArm_bend} position={defaultPositions.rightArm_bend} />
        </RightArm>
      </TorsoBend>

      <LegBend {...leftLeg} position={defaultPositions.leftLeg} >
        <LegBend {...leftLeg_bend} position={defaultPositions.leftLeg_bend} />
      </LegBend>
      <LegBend {...rightLeg} position={defaultPositions.rightLeg} >
        <LegBend {...rightLeg_bend} position={defaultPositions.rightLeg_bend} />
      </LegBend>
    </TorsoBend>
  );
}

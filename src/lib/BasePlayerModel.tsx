import {Head, LeftArm, LeftArmBend, LegBend, RightArm, RightArmBend, TorsoBend} from "@/bodyParts";
import type {BodyPart, BodyPartProps} from "@/bodyParts/bodyPart";
import {defaultPose} from "@/defaults.ts";

export type Pose = Partial<Record<BodyPart, BodyPartProps>>;

interface PlayerModelProps {
  pose?: Pose;
}

export default function BasePlayerModel({ pose }: PlayerModelProps) {
  const {
    head,
    torso, torso_bend,
    leftArm, leftArm_bend,
    rightArm, rightArm_bend,
    leftLeg, leftLeg_bend,
    rightLeg, rightLeg_bend
  } = pose || defaultPose;

  return (
    <TorsoBend {...torso}>
      <TorsoBend {...torso_bend}>
        <Head {...head} />
        <LeftArm {...leftArm}>
          <LeftArmBend {...leftArm_bend} />
        </LeftArm>
        <RightArm {...rightArm}>
          <RightArmBend {...rightArm_bend} />
        </RightArm>
      </TorsoBend>

      <LegBend {...leftLeg}>
        <LegBend {...leftLeg_bend} />
      </LegBend>
      <LegBend {...rightLeg}>
        <LegBend {...rightLeg_bend} />
      </LegBend>
    </TorsoBend>
  );
}

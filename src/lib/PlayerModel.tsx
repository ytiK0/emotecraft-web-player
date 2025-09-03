import {Head, LeftArm, LeftArmBend, LegBend, RightArm, RightArmBend, TorsoBend} from "@/bodyParts";
import type {BodyPart, BodyPartProps} from "@/bodyParts/bodyPart";

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
  } = pose || {};

  return (
    <TorsoBend {...torso} position={[0, 12, 0]}>
      <TorsoBend {...torso_bend} position={[0, 6, 0]}>
        <Head {...head} position={[0,6,0]} />
        <LeftArm {...leftArm} position={[5,4,0]} >
          <LeftArmBend {...leftArm_bend} position={[1,-4,0]}  />
        </LeftArm>
        <RightArm {...rightArm} position={[-5,4,0]} >
          <RightArmBend {...rightArm_bend} position={[-1,-4,0]}  />
        </RightArm>
      </TorsoBend>

      <LegBend {...leftLeg} position={[-2,0,0]} >
        <LegBend {...leftLeg_bend} position={[0, -6, 0]} />
      </LegBend>
      <LegBend {...rightLeg} position={[2,0,0]} >
        <LegBend {...rightLeg_bend} position={[0, -6, 0]} />
      </LegBend>
    </TorsoBend>
  );
}

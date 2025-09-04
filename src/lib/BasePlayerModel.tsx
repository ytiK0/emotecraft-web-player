import {Head, LeftArm, LeftArmBend, LegBend, RightArm, RightArmBend, TorsoBend} from "@/bodyParts";
import type {BodyPart, BodyPartProps} from "@/bodyParts/bodyPart";
import {defaultPose} from "@/defaults.ts";
import type {Mesh} from "three";
import {forwardRef, useImperativeHandle, useRef} from "react";

export type Pose = Partial<Record<BodyPart, BodyPartProps>>;

interface PlayerModelProps {
  pose?: Pose;
}

export const BasePlayerModel = forwardRef(({ pose }: PlayerModelProps, ref) => {
  const torsoRef = useRef<Mesh>(null);
  const torso_bendRef = useRef<Mesh>(null);
  const headRef = useRef<Mesh>(null);
  const leftArmRef = useRef<Mesh>(null);
  const leftArm_bendRef = useRef<Mesh>(null);
  const rightArmRef = useRef<Mesh>(null);
  const rightArm_bendRef = useRef<Mesh>(null);
  const leftLegRef = useRef<Mesh>(null);
  const leftLeg_bendRef = useRef<Mesh>(null);
  const rightLegRef = useRef<Mesh>(null);
  const rightLeg_bendRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => ({
    torso: torsoRef.current,
    torso_bend: torso_bendRef.current,
    head: headRef.current,
    leftArm: leftArmRef.current,
    leftArm_bend: leftArm_bendRef.current,
    rightArm: rightArmRef.current,
    rightArm_bend: rightArm_bendRef.current,
    leftLeg: leftLegRef.current,
    leftLeg_bend: leftLeg_bendRef.current,
    rightLeg: rightLegRef.current,
    rightLeg_bend: rightLeg_bendRef.current
  }), []);

  const {
    head,
    torso, torso_bend,
    leftArm, leftArm_bend,
    rightArm, rightArm_bend,
    leftLeg, leftLeg_bend,
    rightLeg, rightLeg_bend
  } = pose || defaultPose;

  return (
    <TorsoBend ref={torsoRef} name={"torso"} {...torso}>
      <TorsoBend ref={torso_bendRef} {...torso_bend}>
        <Head ref={headRef} {...head} />
        <LeftArm ref={leftArmRef} {...leftArm}>
          <LeftArmBend ref={leftArm_bendRef} {...leftArm_bend} />
        </LeftArm>
        <RightArm ref={rightArmRef} {...rightArm}>
          <RightArmBend ref={rightArm_bendRef} {...rightArm_bend} />
        </RightArm>
      </TorsoBend>

      <LegBend ref={leftLegRef} {...leftLeg}>
        <LegBend ref={leftLeg_bendRef} {...leftLeg_bend} />
      </LegBend>
      <LegBend ref={rightLegRef} {...rightLeg}>
        <LegBend ref={rightLeg_bendRef} {...rightLeg_bend} />
      </LegBend>
    </TorsoBend>
  );
});

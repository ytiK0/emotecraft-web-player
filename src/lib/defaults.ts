import type {BodyPart} from "@/bodyParts/bodyPart";
import {Euler, Vector3} from "three";
import type {Pose} from "@/PlayerModel.tsx";

export const defaultPositions: Record<BodyPart, Vector3> = {
  torso: new Vector3(0, 12, 0),
  torso_bend: new Vector3(0, 6, 0),
  head: new Vector3(0, 6, 0),
  leftArm: new Vector3(5, 4, 0),
  leftArm_bend: new Vector3(1, -4, 0),
  rightArm: new Vector3(-5, 4, 0),
  rightArm_bend: new Vector3(-1, -4, 0),
  leftLeg: new Vector3(-2, 0, 0),
  leftLeg_bend: new Vector3(0, -6, 0),
  rightLeg: new Vector3(2, 0, 0),
  rightLeg_bend: new Vector3(0, -6, 0)
};

export const defaultPose: Pose = {
  torso: {
    rotation: new Euler(0, 0, 0)
  },
  torso_bend: {
    rotation: new Euler(0, 0, 0)
  },
  head: {
    rotation: new Euler(0, 0, 0)
  },
  leftArm: {
    rotation: new Euler(0, 0, 0)
  },
  leftArm_bend: {
    rotation: new Euler(0, 0, 0)
  },
  rightArm: {
    rotation: new Euler(0, 0, 0)
  },
  rightArm_bend: {
    rotation: new Euler(0, 0, 0)
  },
  leftLeg: {
    rotation: new Euler(0, 0, 0)
  },
  leftLeg_bend: {
    rotation: new Euler(0, 0, 0)
  },
  rightLeg: {
    rotation: new Euler(0, 0, 0)
  },
  rightLeg_bend: {
    rotation: new Euler(0, 0, 0)
  }
};
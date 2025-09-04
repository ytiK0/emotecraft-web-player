import {Euler, Vector3} from "three";
import type {Pose} from "@/BasePlayerModel.tsx";

export const defaultPose: Pose = {
  torso: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(0, 12, 0)
  },
  torso_bend: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(0, 6, 0)
  },
  head: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(0, 6, 0)
  },
  leftArm: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(5, 4, 0)
  },
  leftArm_bend: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(1, -4, 0)
  },
  rightArm: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(-5, 4, 0)
  },
  rightArm_bend: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(-1, -4, 0)
  },
  leftLeg: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(-2, 0, 0)
  },
  leftLeg_bend: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(0, -6, 0)
  },
  rightLeg: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(2, 0, 0)
  },
  rightLeg_bend: {
    rotation: new Euler(0, 0, 0),
    position: new Vector3(0, -6, 0)
  }
};
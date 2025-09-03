import type {Euler, Vector3, Vector3Tuple} from "three";
import type {ReactNode} from "react";

type BodyPartProps = {
  name?: BodyPart | string;
  position?: Vector3 | Vector3Tuple;
  rotation?: Euler;
  debug?: boolean;
  children?: ReactNode;
}

type BodyPart = "head" |
  "torso" | "torso_bend" |
  "leftArm" | "leftArm_bend" |
  "rightArm" | "rightArm_bend" |
  "leftLeg" | "leftLeg_bend" |
  "rightLeg" | "rightLeg_bend";
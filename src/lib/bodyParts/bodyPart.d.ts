import type {Euler, Vector3, Vector3Tuple} from "three";
import type {ReactNode} from "react";

type BodyPartProps = {
  name: BodyPart | string;
  position?: Vector3 | Vector3Tuple;
  rotation?: Euler;
  debug?: boolean;
  children?: ReactNode;
}

type BodyParts = "head" | "torso" | "leftArm" | "rightArm" | "leftLeg" | "rightLeg";

type BodyPartWithBend = BodyParts |
  "torso_bend" |
  "leftArm_bend" |
  "rightArm_bend" |
  "leftLeg_bend" |
  "rightLeg_bend";

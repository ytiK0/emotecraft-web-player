import {Vector3} from "three";


export const partsDefaultPosition: Record<MovePart | "torso_bend" , Vector3> = {
  torso: new Vector3(0, 12, 0),
  torso_bend: new Vector3(0,6,0),
  head: new Vector3(0, 6, 0),
  leftArm: new Vector3(5, 4, 0),
  rightArm: new Vector3(-5, 4, 0),
  leftLeg: new Vector3(2, 0, 0),
  rightLeg: new Vector3(-2, 0, 0),
};
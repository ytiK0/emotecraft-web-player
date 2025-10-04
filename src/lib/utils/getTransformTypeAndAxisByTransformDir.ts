import {isRotationTransformDir} from "@/utils/typeGuards/isRotationTransformDir";
import {isScaleTransformationDir} from "@/utils/typeGuards/isScaleTransformationDir";

const rotationMap = {
  "pitch": "x",
  "roll": "z",
  "yaw": "y",
} as const;

const scaleMap = {
  "scaleX": "x",
  "scaleY": "y",
  "scaleZ": "z",
} as const;

export function getTransformTypeAndAxisByTransformDir(dir: MoveTransformationDir) {
  let axis: Axis;
  let transformType: TransformationType = "position";

  if (isRotationTransformDir(dir)) {
    transformType = "rotation";
    axis = rotationMap[dir];
  } else if (isScaleTransformationDir(dir)) {
    transformType = "scale";
    axis = scaleMap[dir];
  } else if (dir === "bend" || dir === "axis") {
    transformType = "bend";
    axis = dir === "bend" ? "x" : "z";
  } else {
    axis = dir;
  }

  return { axis, transformType };
}
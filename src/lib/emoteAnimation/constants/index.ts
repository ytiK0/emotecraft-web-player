import type {
  MovePart,
  PositionTransformationDir,
  RotationTransformationDir,
  TransformationDir
} from "@/emoteAnimation/types/animationJson";

export const MOVE_PARTS: MovePart[] = ["head", "leftArm", "leftLeg", "rightArm", "rightLeg", "torso"];

export const MOVE_TRANSFORMS_DIR: TransformationDir[] = ["x", "y", "z", "pitch", "yaw", "roll"];

export const ROTATION_TRANSFORMS_DIR: RotationTransformationDir[] = ["pitch", "yaw", "roll"];

export const POSITION_TRANSFORMS_DIR: PositionTransformationDir[] = ["x", "y", "z"];
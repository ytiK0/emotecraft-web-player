export const MOVE_PARTS: MovePart[] = ["head", "leftArm", "leftLeg", "rightArm", "rightLeg", "torso"];

export const MOVE_TRANSFORMS_DIR: TransformationDir[] = ["x", "y", "z", "pitch", "yaw", "roll", "scaleX", "scaleY", "scaleZ"];

export const ROTATION_TRANSFORMS_DIR: RotationTransformationDir[] = ["pitch", "yaw", "roll"];

export const POSITION_TRANSFORMS_DIR: PositionTransformationDir[] = ["x", "y", "z"];

export const SCALE_TRANSFORM_DIR: ScaleTransformationDir[] = ["scaleY", "scaleX", "scaleZ"];

export const MOVE_TRANSFORMS_DIR_WITH_BENDING: (TransformationDir|BendTransformationDir)[] = ["bend", "axis", ...MOVE_TRANSFORMS_DIR];
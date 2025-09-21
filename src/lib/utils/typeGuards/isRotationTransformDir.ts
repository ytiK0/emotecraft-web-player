import {ROTATION_TRANSFORMS_DIR} from "@/emoteAnimation/constants";

export function isRotationTransformDir(dir: MoveTransformationDir): dir is RotationTransformationDir {
  return ROTATION_TRANSFORMS_DIR.includes(dir as RotationTransformationDir);
}
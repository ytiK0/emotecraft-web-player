import type {RotationTransformationDir, TransformationDir} from "@/emoteAnimation/animationJson";

export function isRotationTransformDir(dir: TransformationDir): dir is RotationTransformationDir {
  return dir.length > 1;
}
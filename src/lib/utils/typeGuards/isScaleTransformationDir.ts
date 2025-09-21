export function isScaleTransformationDir(dir: MoveTransformationDir): dir is ScaleTransformationDir {
  return dir[0] === "s";
}
import {getTransformTypeAndAxisByTransformDir} from "@/utils/getTransformTypeAndAxisByTransformDir.ts";

export class EmoteKeyframe implements IEmoteKeyframe{
  public readonly tick;
  public readonly easing;
  public readonly value;
  public readonly transformType;
  public readonly axis;

  constructor(move: Move, part: MovePart, dir: MoveTransformationDir) {
    this.tick = move.tick;
    this.easing = move.easing;
    this.value = move[part]![dir] || 0;

    const { axis, transformType } = getTransformTypeAndAxisByTransformDir(dir);

    this.axis = axis;
    this.transformType = transformType;
  }
}
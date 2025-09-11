import type {
  IEmoteKeyframe, Move,
  MovePart,
  TransformationDir
} from "@/emoteAnimation/animationJson";
import {isRotationTransformDir} from "@/utils/typeGuards/isRotationTransformDir.ts";

const rotationMap = {
  "pitch": "x",
  "yaw": "y",
  "roll": "z"
} as const;

export class EmoteKeyframe implements IEmoteKeyframe{
  public readonly tick;
  public readonly easing;
  public readonly value;
  public readonly transformType: "position" | "rotation";
  public readonly axis;

  constructor(move: Move, part: MovePart, dir: TransformationDir) {
    this.tick = move.tick;
    this.easing = move.easing;
    this.value = move[part]![dir] || 0;

    this.transformType = "position";
    if (isRotationTransformDir(dir)) {
      this.transformType = "rotation";
      dir = rotationMap[dir];
    }

    this.axis = dir;
  }
}
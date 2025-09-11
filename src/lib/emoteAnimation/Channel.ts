import type {EmoteKeyframe} from "@/emoteAnimation/EmoteKeyframe.ts";
import type {KeyframePair, RotationTransformationDir, TransformationDir} from "@/emoteAnimation/animationJson";

const rotationMap = {
  "pitch": "x",
  "roll": "z",
  "yaw": "y",
} as const;

function isRotationTransformDir(dir: TransformationDir): dir is RotationTransformationDir {
  return dir.length > 1;
}

export class Channel {
  public readonly axis: "x" | "y" | "z";
  public readonly transformType: "position" | "rotation";
  private readonly keyframes: EmoteKeyframe[] = [];
  private cursor = 0;

  constructor(transformationDir: TransformationDir, keyframes: EmoteKeyframe[]) {
    this.transformType = "position";
    if (isRotationTransformDir(transformationDir)) {
      this.transformType = "rotation";
      transformationDir = rotationMap[transformationDir];
    }

    this.axis = transformationDir;
    this.keyframes.push({
      tick: 0,
      easing: "LINEAR",
      axis: this.axis,
      transformType: this.transformType,
      value: 0,
    });
    this.keyframes.push(...keyframes.filter((kf) => kf.transformType === this.transformType && kf.axis === this.axis));
  }

  getKeyframes(t: Tick): KeyframePair {
    const kf = this.keyframes;

    while (this.cursor < kf.length - 2 && t >= kf[this.cursor + 1].tick) {
      this.cursor++;
    }

    while (this.cursor > 0 && t < kf[this.cursor].tick) {
      this.cursor--;
    }

    return {
      prev: kf[this.cursor],
      next: kf[this.cursor + 1]
    };
  }
}
import type {EmoteKeyframe} from "@/emoteAnimation/core/EmoteKeyframe.ts";
import type {KeyframePair, RotationTransformationDir, TransformationDir} from "@/emoteAnimation/types/animationJson";

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
      easing: keyframes[0]?.easing || "LINEAR",
      axis: this.axis,
      transformType: this.transformType,
      value: 0,
    });
    this.keyframes.push(...keyframes.filter((kf) => kf.transformType === this.transformType && kf.axis === this.axis));
  }

  getKeyframes(t: Tick): KeyframePair {
    const kf = this.keyframes;

    while (this.cursor < kf.length - 1 && t >= kf[this.cursor + 1]?.tick) {
      this.cursor++;
    }

    if (this.cursor > 0 && t < kf[this.cursor].tick) {
      const next = kf[this.cursor];
      while (this.cursor > 0 && t < kf[this.cursor].tick) {
        this.cursor--;
      }

      return {
        prev: kf[this.cursor],
        next,
      // @ts-ignore
        spoil: true
      };
    }

    return {
      prev: kf[this.cursor],
      next: kf[this.cursor + 1]
    };
  }

  hasKeyframe(t: Tick) {
    return this.findKeyframeByTick(t) !== null;
  }

  findKeyframeByTick(t: Tick) {
    const kfs = this.keyframes;
    let l = 0;
    let r = kfs.length - 1;

    while (l <= r) {
      const m = l + Math.floor((r - l) / 2);
      if (kfs[m].tick === t) {
        return kfs[m];
      }
      if (kfs[m].tick < t) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }

    return null;
  }
}
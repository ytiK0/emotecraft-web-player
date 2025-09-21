import {getTransformTypeAndAxisByTransformDir} from "@/utils/getTransformTypeAndAxisByTransformDir.ts";

export class Channel {
  public readonly axis: Axis;
  public readonly transformType: TransformationType;
  private readonly keyframes: IEmoteKeyframe[] = [];
  private cursor = 0;

  constructor(transformationDir: MoveTransformationDir, keyframes: IEmoteKeyframe[]) {
    const { axis, transformType} = getTransformTypeAndAxisByTransformDir(transformationDir);

    this.transformType = transformType;
    this.axis = axis;

    this.keyframes.push({
      tick: 0,
      easing: keyframes[0]?.easing || "LINEAR",
      value: 0,
      axis: this.axis,
      transformType: this.transformType,
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
        next
      };
    }

    return {
      prev: kf[this.cursor],
      next: kf[this.cursor + 1] || null
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
import E from "easing-functions";
import type {KeyframePair} from "@/emoteAnimation/types/animationJson";

E.Constant = (t: number) => t >= 1 ? t : 0;

const SUFFIXES: Array<[string, E.Interpolation]> = [
  ["QUADRATIC", "Quadratic"],
  ["QUAD", "Quadratic"],
  ["CUBIC", "Cubic"],
  ["QUARTIC", "Quartic"],
  ["QUART", "Quartic"],
  ["QUINTIC", "Quintic"],
  ["QUINT", "Quintic"],
  ["SINE", "Sinusoidal"],
  ["EXPO", "Exponential"],
  ["EXPONENTIAL", "Exponential"],
  ["CIRCULAR", "Circular"],
  ["CIRC", "Circular"],
  ["CONSTANT", "Constant"],
  ["BACK", "Back"],
  ["ELASTIC", "Elastic"],
  ["BOUNCE", "Bounce"],
  ["LINEAR", "Linear"],
];

export class Interpolator {
  static easingCache = new Map<string, E.EasingFunc>();

  static parseEasing(easingStr: string): E.EasingFunc {
    const s = easingStr;

    const cached = this.easingCache.get(s);
    if (cached) return cached;

    let easing: E.EasingMode | null = null;
    if (s.startsWith("EASEINOUT")) easing = "InOut";
    else if (s.startsWith("EASEIN")) easing = "In";
    else if (s.startsWith("EASEOUT")) easing = "Out";

    let interpolation: E.Interpolation = "Linear";
    for (const [suffix, interp] of SUFFIXES) {
      if (s.endsWith(suffix)) {
        interpolation = interp;
        break;
      }
    }

    const interGroup = E[interpolation];

    let result: E.EasingFunc;

    if (easing) result = (interGroup as E.EasingGroup)[easing];
    else result = interGroup as E.EasingFunc;

    this.easingCache.set(s, result);
    return result;
  }

  static interpolate(keyframePair: KeyframePair, time: Tick) {
    const { prev, next } = keyframePair;

    const { tick: t0, value: v0, easing } = prev;
    const { tick: t1, value: v1 } = next || prev;

    if (t0 === t1) return v1;

    const easingFn = this.parseEasing(easing);

    const ratio = (time - t0) / (t1 - t0);
    const eased = easingFn(ratio);

    return v0 + (v1 - v0) * eased;
  }
}
import E from "easing-functions";

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

const PARSE_EASING_CACHE = new Map<string, E.EasingFunc>();

export function parseEasing(easingStr: string): E.EasingFunc {
  const s = easingStr;

  const cached = PARSE_EASING_CACHE.get(s);
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

  PARSE_EASING_CACHE.set(s, result);
  return result;
}

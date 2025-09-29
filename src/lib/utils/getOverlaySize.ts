import type {Vector3Tuple} from "three";

const OVERLAY_SIZE_ADD = 1;

export function getOverlaySize(size: Vector3Tuple) {
  return size.map((el) => el + OVERLAY_SIZE_ADD) as Vector3Tuple;
}
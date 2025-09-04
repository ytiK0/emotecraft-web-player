import {MOVE_PARTS, MOVE_TRANSFORMS_DIR} from "@/animationJson/constst.ts";

export function getAggregateMoveData(move: Move): AggregateMoveData[] {
  const aggregateMoveData: AggregateMoveData[] = [];

  for (const part of MOVE_PARTS) {
    if (part in move) {
      for (const transformDir of MOVE_TRANSFORMS_DIR) {
        if (transformDir in move[part]!) {
          aggregateMoveData.push({
            part,
            transformDir,
            value: move[part]![transformDir]!,
            easing: move.easing,
          });
        }
      }
    }
  }
  return aggregateMoveData;
}
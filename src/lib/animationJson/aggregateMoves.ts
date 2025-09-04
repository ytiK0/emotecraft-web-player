import {getAggregateMoveData} from "@/animationJson/getAggregateMoveData.ts";

export function aggregateMoves(moves: Move[]): AggregateMoves {
  return moves.reduce((acc, move) => {
    if (!(move.tick in acc))
      acc[move.tick] = [];
    acc[move.tick].push(...getAggregateMoveData(move));
    return acc;
  }, {} as AggregateMoves);
}
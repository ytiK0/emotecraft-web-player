import {Track} from "@/emoteAnimation/Track.ts";
import {MOVE_TRANSFORMS_DIR} from "@/animationJson/constst.ts";
import {EmoteKeyframe} from "@/emoteAnimation/EmoteKeyframe.ts";
import type {EmoteMeta, Move, MovePart, TransformationDir, Update} from "@/emoteAnimation/animationJson";
import {isRotationTransformDir} from "@/utils/typeGuards/isRotationTransformDir.ts";

const MOVE_PARTS: MovePart[] = ["head", "torso", "leftArm", "rightArm", "leftLeg", "rightLeg"];

function restoreMove (move: Move) {
  if (move.rightArm && move.rightArm.y !== undefined) {
    move.rightArm.y -= 12;
  }
  if (move.leftArm && move.leftArm.y !== undefined) {
    move.leftArm.y -= 12;
  }

  if (move.rightLeg) {
    if (move.rightLeg.x !== undefined) {
      move.rightLeg.x -= 0.1;
    }
    if (move.rightLeg.y !== undefined) {
      move.rightLeg.y -= 0.1;
    }
  }
  if (move.leftLeg) {
    if (move.leftLeg.x !== undefined) {
      move.leftLeg.x += 0.1;
    }
    if (move.leftLeg.y !== undefined) {
      move.leftLeg.y += 0.1;
    }
  }

  if (move.rightLeg && move.rightLeg.y !== undefined) {
    move.rightLeg.y += 12;
  }
  if (move.leftLeg && move.leftLeg.y !== undefined) {
    move.leftLeg.y += 12;
  }

  for (const part of MOVE_PARTS) {
    if (move[part]) {
      for (const axis of MOVE_TRANSFORMS_DIR) {
        if (isRotationTransformDir(axis)) {
          if (part !== "torso" || axis === "roll") {
            if (axis === "pitch") continue;
            if (move[part] && move[part][axis] !== undefined) {
              move[part][axis] *= -1;
            }
          }
        } else {
          if (part === "torso" && move.torso && move.torso[axis] !== undefined) {
            move.torso[axis] *= 4;
            if (axis === "z" && move.torso.z !== undefined) {
              move.torso.z *= -1;
            }
          }
          if (move[part][axis] !== undefined) {
            move[part][axis] /= -4;
            if (axis === "x") {
              move[part][axis] *= -1;
            }
          }
        }
      }
      if (move[part].bend !== undefined) {
        move[part].bend *= -1;
      }
    }
  }

  return move;
}

export class Animation {
  private readonly _moves: Move[];
  private tracks: Track[] = [];

  constructor(emoteMeta: EmoteMeta) {
    this._moves = emoteMeta.moves.map(restoreMove);
    for (const movePart of MOVE_PARTS) {
      const { base, bend } = this.generateKeyframes(movePart);
      this.tracks.push(new Track(movePart, base));
      if (bend && movePart !== "head") {
        this.tracks.push(new Track(`${movePart}_bend`, bend));
      }
    }
  }

  private generateKeyframes(target: MovePart): { base: EmoteKeyframe[], bend?: EmoteKeyframe[] } {
    const moves = this._moves;
    const base: EmoteKeyframe[] = [];
    const bend: EmoteKeyframe[] = [];

    for (const move of moves) {
      if (move[target] !== undefined) {
        const transform = move[target];
        if (transform.bend !== undefined) {
          bend.push(new EmoteKeyframe(move, target, "pitch"));
        }
        for (const dir of MOVE_TRANSFORMS_DIR) {
          if (transform[dir as TransformationDir] !== undefined) {
            base.push(new EmoteKeyframe(move, target, dir));
          }
        }
      }
    }

    return { base, bend };
  }

  getUpdates(t: Tick): Update[] {
    return this.tracks.map((track) => track.getUpdate(t)).flat();
  }
}
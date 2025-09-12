import {Track} from "@/emoteAnimation/Track.ts";
import {MOVE_TRANSFORMS_DIR, POSITION_TRANSFORMS_DIR} from "@/emoteAnimation/constst.ts";
import {EmoteKeyframe} from "@/emoteAnimation/EmoteKeyframe.ts";
import type {
  EmoteMeta,
  Move,
  MovePart,
  PositionTransformationDir,
  TransformationDir,
  Update
} from "@/emoteAnimation/animationJson";
import {isRotationTransformDir} from "@/utils/typeGuards/isRotationTransformDir.ts";

const MOVE_PARTS: MovePart[] = ["head", "torso", "leftArm", "rightArm", "leftLeg", "rightLeg"];
const LIMBS: Exclude<MovePart, "head" | "torso">[] = ["leftArm", "rightArm", "leftLeg", "rightLeg"];

const limbAdaptation: Record<Exclude<MovePart, "head" | "torso">, Record<PositionTransformationDir, number>> = {
  rightArm: {
    x: 1.25, z: 0, y: -2.5
  },
  leftArm: {
    x: -1.25, z: 0, y: 3.5
  },
  rightLeg: {
    x: 0.5, y: 0, z: 0
  },
  leftLeg: {
    x: -0.5, y: 0, z: 0
  }
};

function adaptLimbMove(move: Move) {
  for (const limb of LIMBS) {
    for (const axis of POSITION_TRANSFORMS_DIR) {
      if (move[limb] && move[limb][axis] !== undefined) {
        move[limb][axis] += limbAdaptation[limb][axis];
      }
    }
  }
}

function adaptMove(move: Move) {
  if (move.rightArm && move.rightArm.y !== undefined) {
    move.rightArm.y -= 12;
  }
  if (move.leftArm && move.leftArm.y !== undefined) {
    move.leftArm.y += 12;
  }

  if (move.rightLeg) {
    if (move.rightLeg.x !== undefined) {
      move.rightLeg.x -= 0.1;
    }
    if (move.rightLeg.z !== undefined) {
      move.rightLeg.z -= 0.1;
    }
  }
  if (move.leftLeg) {
    if (move.leftLeg.x !== undefined) {
      move.leftLeg.x += 0.1;
    }
    if (move.leftLeg.z !== undefined) {
      move.leftLeg.z += 0.1;
    }
  }

  if (move.rightLeg && move.rightLeg.y !== undefined) {
    move.rightLeg.y -= 12;
  }
  if (move.leftLeg && move.leftLeg.y !== undefined) {
    move.leftLeg.y -= 12;
  }

  for (const part of MOVE_PARTS) {
    if (move[part]) {
      for (const axis of MOVE_TRANSFORMS_DIR) {
        if (isRotationTransformDir(axis)) {
          if (part !== "torso" || axis === "roll" || axis === "pitch") {
            if (move[part] && move[part][axis] !== undefined) {
              move[part][axis] *= -1;
              if (axis === "pitch" && part.startsWith("left")) {
                move[part][axis] *= -1;
              }
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
    }
  }

  adaptLimbMove(move);

  return move;
}

export class Animation {
  private readonly _moves: Move[];
  private tracks: Track[] = [];

  constructor(emoteMeta: EmoteMeta) {
    this._moves = emoteMeta.moves.map(adaptMove );
    for (const movePart of MOVE_PARTS) {
      const { base, bend } = this.generateKeyframes(movePart);
      this.tracks.push(new Track(movePart, base));
      if (movePart !== "head") {
        this.tracks.push(new Track(`${movePart}_bend`, bend));
      }
    }
  }

  private generateKeyframes(target: MovePart): { base: EmoteKeyframe[], bend: EmoteKeyframe[] } {
    const moves = this._moves;
    const base: EmoteKeyframe[] = [];
    const bend: EmoteKeyframe[] = [];

    for (const move of moves) {
      if (move[target] !== undefined) {
        const transform = move[target];
        if (transform.bend !== undefined) {
          bend.push(new EmoteKeyframe(move, target, "bend"));
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
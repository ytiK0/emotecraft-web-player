import {Track} from "@/emoteAnimation/core/Track.ts";
import {MOVE_TRANSFORMS_DIR, POSITION_TRANSFORMS_DIR} from "@/emoteAnimation/constants";
import {EmoteKeyframe} from "@/emoteAnimation/core/EmoteKeyframe.ts";
import type {
  EmoteMeta,
  Move,
  MovePart,
  PositionTransformationDir,
  TransformationDir,
  Update
} from "@/emoteAnimation/types/animationJson";
import {isRotationTransformDir} from "@/utils/typeGuards/isRotationTransformDir.ts";

const MOVE_PARTS: MovePart[] = ["head", "torso", "leftArm", "rightArm", "leftLeg", "rightLeg"];
const LIMBS: Exclude<MovePart, "head" | "torso">[] = ["leftArm", "rightArm", "leftLeg", "rightLeg"];

const limbAdaptation: Record<Exclude<MovePart, "head" | "torso">, Record<PositionTransformationDir, number>> = {
  rightArm: { x: 1.25, z: 0, y: -2.5 },
  leftArm: { x: -1.25, z: 0, y: 3.5},
  rightLeg: { x: 0.5, y: 0, z: 0 },
  leftLeg: { x: -0.5, y: 0, z: 0 }
};

type MutationOperation = "add" | "mlt" | "dvd"

function getMutator(move: Move) {
  return (part: MovePart, transformDir: TransformationDir | "bend", changeVal: number, operation: MutationOperation  = "add") => {
    if (move[part] && move[part][transformDir] !== undefined) {
      if (operation === "mlt") {
        move[part][transformDir] *= changeVal;
      } else  if (operation === "dvd") {
        move[part][transformDir] /= changeVal;
      } else {
        move[part][transformDir] += changeVal;
      }
    }
  };
}

function adaptLimbMove(move: Move) {
  const applyMutate = getMutator(move);

  for (const limb of LIMBS) {
    for (const axis of POSITION_TRANSFORMS_DIR) {
      applyMutate(limb, axis, limbAdaptation[limb][axis]);
    }
  }
}

function adaptMove(move: Move) {
  move = structuredClone(move);
  const applyMutate = getMutator(move);

  applyMutate("rightArm", "y", -12);
  applyMutate("leftArm", "y", 12);

  applyMutate("rightLeg", "x", -0.1);
  applyMutate("rightLeg", "z", -0.1);

  applyMutate("leftLeg", "x", 0.1);
  applyMutate("leftLeg", "z", 0.1);

  applyMutate("rightLeg", "y", -12);
  applyMutate("leftLeg", "y", -12);


  for (const part of MOVE_PARTS) {
    if (move[part]) {
      for (const dir of MOVE_TRANSFORMS_DIR) {
        if (isRotationTransformDir(dir)) {
          // rotation transformation
          if (
            dir === "roll" ||                         // всегда для roll
            (dir === "pitch" && part === "torso") || // pitch только для torso
            (dir !== "pitch" && part !== "torso")   // другие оси — только для конечностей
          ) {
            applyMutate(part, dir, -1, "mlt");
          }
        } else {
          // position transformation
          if (part === "torso") {
            const changeVal = dir === "z" ? -4 : 4;
            applyMutate(part, dir, changeVal, "mlt");
          } else {
            const changeVal = dir === "x" ? 4 : -4;
            applyMutate(part, dir, changeVal, "dvd");
          }
        }
      }
    }
  }

  adaptLimbMove(move);

  return move;
}

export class Animation {
  private readonly moves: Move[];
  private readonly tracks: Track[] = [];
  public readonly isLoop: boolean;
  public readonly endTick: Tick;
  public readonly returnTick: Tick;

  constructor(emoteMeta: EmoteMeta) {
    this.isLoop = emoteMeta.isLoop === "true";
    this.endTick = emoteMeta.endTick as Tick;
    this.returnTick = emoteMeta.returnTick as Tick;
    this.moves = emoteMeta.moves.map(adaptMove);
    for (const movePart of MOVE_PARTS) {
      const { base, bend } = this.generateKeyframes(movePart);
      this.tracks.push(new Track(movePart, base));
      if (movePart !== "head") {
        this.tracks.push(new Track(`${movePart}_bend`, bend));
      }
    }
  }

  private generateKeyframes(target: MovePart): { base: EmoteKeyframe[], bend: EmoteKeyframe[] } {
    const moves = this.moves;
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
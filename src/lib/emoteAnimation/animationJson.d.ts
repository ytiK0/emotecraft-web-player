import type {BodyPart} from "@/bodyParts/bodyPart";

type MovePart = "head" | "torso" | "leftLeg" | "rightLeg" | "leftArm" | "rightArm";

type PositionTransformationDir = "x" | "y" | "z";
type RotationTransformationDir = "pitch" | "yaw" | "roll";
type TransformationDir = PositionTransformationDir | RotationTransformationDir;


type MoveBase = {
  tick: number,
  easing: string,
  turn: number,
}

type EmoteTransformation = {
  [V in (TransformationDir | "bend")]?: number
}

type MoveData = {
  [P in MovePart]?: EmoteTransformation
}

type Move = MoveBase & MoveData;


type EmoteMeta = {
  isLoop: `${boolean}`,
  returnTick: number,
  beginTick: number,
  endTick: number,
  stopTick: number,
  degrees: boolean,
  moves: Move[]
}

type EmoteA11yString = {
  translate: string,
  fallback: string
} | string

type EmoteHead = {
  name: EmoteA11yString,
  author: string,
  description: EmoteA11yString,
}

type Emote = EmoteHead & {
  emote: EmoteMeta
}

type IEmoteKeyframe = {
  tick: number,
  easing: string,
  value: number,
  axis: "x" | "y" | "z",
  transformType: "position" | "rotation",
}

type KeyframePair = {
  prev: IEmoteKeyframe,
  next?: IEmoteKeyframe
}

type Update = {
  axis: PositionTransformationDir,
  transformType: "position" | "rotation",
  target: BodyPart,
  value: number
}

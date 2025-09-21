type MovePart = "head" | "torso" | "leftLeg" | "rightLeg" | "leftArm" | "rightArm";

type Axis = "x" | "y" | "z"

type PositionTransformationDir = Axis;
type RotationTransformationDir = "pitch" | "yaw" | "roll";
type ScaleTransformationDir = "scaleX" | "scaleY" |"scaleZ";
type BendTransformationDir = "bend" | "axis";
type TransformationDir = PositionTransformationDir | RotationTransformationDir | ScaleTransformationDir;
type MoveTransformationDir = TransformationDir | BendTransformationDir

type TransformationType = "position" | "rotation" | "scale" | "bend";

type MoveBase = {
  tick: number,
  easing: string,
  turn: number,
}

type EmoteTransformation = {
  [V in (MoveTransformationDir)]?: number
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
  axis: Axis,
  transformType: TransformationType,
}

type KeyframePair = {
  prev: IEmoteKeyframe,
  next?: IEmoteKeyframe
}

type Update = {
  axis: PositionTransformationDir,
  transformType: TransformationType,
  target: MovePart,
  value: number
}

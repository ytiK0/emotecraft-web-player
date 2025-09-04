type MovePart = "head" | "torso" | "leftLeg" | "rightLeg" | "leftArm" | "rightArm";
type MoveTransformDir =  "x" | "y" | "z" | "pitch" | "yaw" | "roll" | "bend" | "axis";

type MoveBase = {
  tick: number,
  easing: string,
  turn: number,
}

type MoveData = {
  [P in MovePart]?:{
    [V in MoveTransformDir]?: number
  }
}

type Move = MoveBase & MoveData;


type EmoteData = {
  isLoop: boolean,
  returnTick: number,
  beginTick: number,
  endTick: number,
  stopTick: number,
  degrees: boolean,
  moves: Move[]
}

type EmoteMetaA11yString = {
  translate: string,
  fallback: string
} | string

type EmoteMeta = {
  name: EmoteMetaA11yString,
  author: string,
  description: EmoteMetaA11yString,
}

type Emote = EmoteMeta & EmoteData

type AggregateMoveData = {
  part: MovePart,
  transformDir: MoveTransformDir,
  value: number
  easing: string,
}

type AggregateMoves = {
  [tick: number]: AggregateMoveData[]
}

declare module 'easing-functions' {
  export type EasingFunc = (k: number) => number;

  export interface EasingGroup {
    In: EasingFunc;
    Out: EasingFunc;
    InOut: EasingFunc;
  }

  export interface EasingNamespace {
    Quadratic: EasingGroup;
    Cubic: EasingGroup;
    Quartic: EasingGroup;
    Quintic: EasingGroup;
    Sinusoidal: EasingGroup;
    Exponential: EasingGroup;
    Circular: EasingGroup;
    Elastic: EasingGroup;
    Back: EasingGroup;
    Bounce: EasingGroup;
    Linear: EasingFunc;
    Constant: EasingFunc;
  }

  export type Interpolation = keyof EasingNamespace;
  export type EasingMode = keyof EasingGroup;

  const Easing: EasingNamespace;
  export = Easing;
}

declare global {
  interface Window {
    Easing?: import('easing-functions').EasingNamespace;
  }
}

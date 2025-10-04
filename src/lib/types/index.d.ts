import type {CSSProperties, PropsWithChildren} from "react";
import type {ColorRepresentation, Vector3} from "three";

export type EmotePlayerSceneProps = PropsWithChildren<{
  className?: string,
  style?: CSSProperties,
  skyColor?: ColorRepresentation,
  defaultScene?: boolean
}>

export type EmotePlayerAPI = {
  pause: () => void,
  resume: () => void,
  restart: () => void,
  toggle: () => void
}

export type EmotePlayerProps = {
  emote?: Emote,
  playerModelPosition?: Vector3,
  skinSrc: string,
  isSlimModel?: boolean,
}
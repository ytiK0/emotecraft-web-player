import {BoxGeometry} from "three";

const bendSize = [4, 6, 4] as const;

export const bendGeometry = new BoxGeometry(...bendSize);
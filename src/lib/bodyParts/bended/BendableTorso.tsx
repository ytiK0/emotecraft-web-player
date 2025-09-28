import {Vector2, Vector3, type Vector3Tuple} from "three";
import {forwardRef, type ReactNode} from "react";
import type {BodyPartProps, TextureConfig} from "@/bodyParts/types/bodyPart";
import {BendableBodyPartBase} from "@/bodyParts/bended/BendableBodyPartBase.tsx";
import type {DisposableBodyPartRepresentation} from "@/types/playerModel";

const TORSO_SIZE = [8, 12, 4] as Vector3Tuple;
const TORSO_PIVOT_SHIFT = new Vector3(0, 6, 0);

const TORSO_TEXTURE_CONFIG: TextureConfig = {
  textureStart: new Vector2(16, 16)
};
export const BendableTorso = forwardRef<DisposableBodyPartRepresentation, BodyPartProps & {bendChildren?: ReactNode}>(({children, name, debug, position, bendChildren}, ref) => {
  return <BendableBodyPartBase
    ref={ref}
    pivotShift={TORSO_PIVOT_SHIFT}
    partSize={TORSO_SIZE}
    textureConfig={TORSO_TEXTURE_CONFIG}
    name={name}
    debug={debug}
    position={position}
    bendChildren={bendChildren}
    bendDirection={"top"}
  >
    { children }
  </BendableBodyPartBase>;
});
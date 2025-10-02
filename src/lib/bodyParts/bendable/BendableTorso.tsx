import {Vector2, Vector3, type Vector3Tuple} from "three";
import {forwardRef, type ReactNode} from "react";
import type {BodyPartProps, TextureConfig} from "@/bodyParts/types/bodyPart";
import {BendableBodyPartBase} from "@/bodyParts/bendable/BendableBodyPartBase.tsx";
import type {DisposableBodyPartRepresentation} from "@/types/playerModel";

const torsoSize = [8, 12, 4] as Vector3Tuple;
const torsoPivotPointShift = new Vector3(0, 6, 0);

const torsoTextureConfig: TextureConfig = {
  textureStart: new Vector2(16, 16)
};
const torsoOverlayTextureConfig: TextureConfig = {
  textureStart: new Vector2(16, 32),
  textureSizes: new Vector3(...torsoSize)
};
export const BendableTorso = forwardRef<DisposableBodyPartRepresentation, BodyPartProps & {bendChildren?: ReactNode}>(({children, name, debug, position, bendChildren}, ref) => {
  return <BendableBodyPartBase
    ref={ref}
    pivotShift={torsoPivotPointShift}
    partSize={torsoSize}
    textureConfig={torsoTextureConfig}
    overlayTextureConfig={torsoOverlayTextureConfig}
    name={name}
    debug={debug}
    position={position}
    bendChildren={bendChildren}
    bendDirection={"top"}
  >
    { children }
  </BendableBodyPartBase>;
});
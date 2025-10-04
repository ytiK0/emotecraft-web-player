import {Vector2, Vector3, type Vector3Tuple} from "three";
import {forwardRef} from "react";
import type {BodyPartProps, TextureConfig} from "@/bodyParts/types/bodyPart";
import {BendableBodyPartBase} from "@/bodyParts/bendable/BendableBodyPartBase";
import type {DisposableBodyPartRepresentation} from "@/types/playerModel";

const legSize = [4, 12, 4] as Vector3Tuple;
const legGeometrySize = legSize.map((e) => e - 0.01) as Vector3Tuple;

const LEFT_LEG_PIVOT_POINT_SHIFT = new Vector3(0,-6, 0);
const LEFT_LEG_TEXTURE_CONFIG: TextureConfig = {
  textureStart: new Vector2(16, 64 - 16),
  textureSizes: new Vector3(...legSize)
};

const leftLegOverlayTextureConfig: TextureConfig = {
  textureStart: new Vector2(0, 64 - 16),
  textureSizes: new Vector3(...legSize)
};
export const BendableLeftLeg = forwardRef<DisposableBodyPartRepresentation, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  return (
    <BendableBodyPartBase
      ref={ref}
      pivotShift={LEFT_LEG_PIVOT_POINT_SHIFT}
      partSize={legGeometrySize}
      textureConfig={LEFT_LEG_TEXTURE_CONFIG}
      overlayTextureConfig={leftLegOverlayTextureConfig}
      position={position}
      name={name}
      debug={debug}
    >
      { children }
    </BendableBodyPartBase>
  );
});

const rightLegGeometrySize = legSize.map((e) => e - 0.01) as Vector3Tuple;

const RIGHT_LEG_PIVOT_POINT_SHIFT = new Vector3(0,-6, 0);
const RIGHT_LEG_TEXTURE_CONFIG: TextureConfig = {
  textureStart: new Vector2(0, 16),
  textureSizes: new Vector3(...legSize)
};
const rightLegOverlayTextureConfig: TextureConfig = {
  textureStart: new Vector2(0, 32),
  textureSizes: new Vector3(...legSize)
};
export const BendableRightLeg = forwardRef<DisposableBodyPartRepresentation, BodyPartProps>(({children, name, debug, position}: BodyPartProps, ref) => {
  return (
    <BendableBodyPartBase
      ref={ref}
      pivotShift={RIGHT_LEG_PIVOT_POINT_SHIFT}
      partSize={rightLegGeometrySize}
      textureConfig={RIGHT_LEG_TEXTURE_CONFIG}
      overlayTextureConfig={rightLegOverlayTextureConfig}
      position={position}
      name={name}
      debug={debug}
    >
      { children }
    </BendableBodyPartBase>
  );
});
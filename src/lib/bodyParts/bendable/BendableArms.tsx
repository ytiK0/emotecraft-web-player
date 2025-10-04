import {Vector3, type Vector3Tuple} from "three";
import {forwardRef} from "react";
import type {BodyPartProps} from "@/bodyParts/types/bodyPart";
import {BendableBodyPartBase} from "@/bodyParts/bendable/BendableBodyPartBase";
import type {DisposableBodyPartRepresentation} from "@/types/playerModel";
import {buildTextureConfig} from "@/utils/buildTextureConfig";

type  ArmsProps = BodyPartProps & {
  isSlim?: boolean
}

const armSize = [4, 12, 4] as Vector3Tuple;
const slimArmSize = [3, 12, 4] as Vector3Tuple;

const armGeometrySize = {
  default: armSize.map((e) => e - 0.01) as Vector3Tuple,
  slim: slimArmSize.map((e) => e - 0.01) as Vector3Tuple
} ;

const leftArmPivotPointShift = new Vector3(1, -4, 0);
const leftArmTextureConfig = {
  default: buildTextureConfig(32, 64 - 16, armSize),
  slim: buildTextureConfig(32, 64 - 16, slimArmSize)
};
const leftArmOverlayTextureConfig = {
  default: buildTextureConfig(32 + 16, 64 - 16, armSize),
  slim: buildTextureConfig(32 + 16, 64 - 16, slimArmSize)
};

export const BendableLeftArm = forwardRef<DisposableBodyPartRepresentation, ArmsProps>(({
  children,
  name,
  debug,
  position,
  isSlim
}, ref) => {
  const version = isSlim ? "slim" : "default";

  const textureConfig = leftArmTextureConfig[version];
  const overlayTextureConfig = leftArmOverlayTextureConfig[version];
  const partSize = armGeometrySize[version];

  return (
    <BendableBodyPartBase
      ref={ref}
      pivotShift={leftArmPivotPointShift}
      partSize={partSize}
      textureConfig={textureConfig}
      overlayTextureConfig={overlayTextureConfig}
      position={position}
      name={name}
      debug={debug}
    >
      { children }
    </BendableBodyPartBase>
  );
});

const rightArmPivotPointShift = new Vector3(-1, -4, 0);
const rightArmTextureConfig = {
  default: buildTextureConfig(32 + 8, 16, armSize),
  slim: buildTextureConfig(32 + 8, 16, slimArmSize)
};
const rightArmOverlayTextureConfig =  {
  default: buildTextureConfig(32 + 8, 32, armSize),
  slim: buildTextureConfig(32 + 8, 32, slimArmSize)
};

export const BendableRightArm = forwardRef<DisposableBodyPartRepresentation, ArmsProps>(({
  children,
  name,
  debug,
  position,
  isSlim
}, ref) => {
  const version = isSlim ? "slim" : "default";

  const textureConfig = rightArmTextureConfig[version];
  const overlayTextureConfig = rightArmOverlayTextureConfig[version];
  const partSize = armGeometrySize[version];

  return (
    <BendableBodyPartBase
      ref={ref}
      pivotShift={rightArmPivotPointShift}
      partSize={partSize}
      textureConfig={textureConfig}
      overlayTextureConfig={overlayTextureConfig}
      position={position}
      name={name}
      debug={debug}
    >
      { children }
    </BendableBodyPartBase>
  );
});
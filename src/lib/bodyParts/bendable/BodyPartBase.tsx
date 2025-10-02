import {forwardRef, useMemo} from "react";
import DebugSphere from "@/utils/DebugSphere.tsx";
import {Mesh} from "three";
import {useSkinMaterial} from "@/contexts/SkinMaterial";
import {BodyPartGeometry} from "@/bodyParts/base/BodyPartGeometry.ts";
import type {BodyPartBaseProps} from "@/bodyParts/types/bodyPart";
import {getOverlaySize} from "@/utils/getOverlaySize.ts";

export const BodyPartBase = forwardRef<Mesh, BodyPartBaseProps>(({
  pivotShift,
  partSize,
  textureConfig,
  overlayTextureConfig,
  name,
  debug,
  children,
  position
}, ref) => {
  const skinMaterial = useSkinMaterial();
  const baseGeometry = useMemo(() => new BodyPartGeometry(...partSize, textureConfig), [partSize, textureConfig]);
  const overlayGeometry = useMemo(() => {
    if (overlayTextureConfig) {
      return new BodyPartGeometry(...getOverlaySize(partSize), overlayTextureConfig);
    }
  }, [partSize, overlayTextureConfig]);

  return (
    <group name={`${name}_P`} position={position}>
      <object3D ref={ref} name={name}>
        {debug && <DebugSphere/>}
        <mesh position={pivotShift} material={skinMaterial} geometry={baseGeometry}/>
        {
          overlayGeometry
          && <mesh position={pivotShift} material={skinMaterial} geometry={overlayGeometry}/>
        }
        {children}
      </object3D>
    </group>
  );
});
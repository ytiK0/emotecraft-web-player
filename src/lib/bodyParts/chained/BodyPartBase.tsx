import {forwardRef, useMemo} from "react";
import DebugSphere from "@/utils/DebugSphere.tsx";
import {Mesh} from "three";
import {useSkinMaterial} from "@/contexts/SkinMaterial";
import {BodyPartGeometry} from "@/bodyParts/base/BodyPartGeometry.ts";
import type {BodyPartBaseProps} from "@/bodyParts/types/bodyPart";

export const BodyPartBase = forwardRef<Mesh, BodyPartBaseProps>(({
  pivotShift,
  partSize,
  textureStart,
  name,
  debug,
  children,
  position
}, ref) => {
  const skinMaterial = useSkinMaterial();
  const geometry = useMemo(() => new BodyPartGeometry(...partSize, textureStart), [partSize, textureStart]);

  return (
    <group name={`${name}_P`} position={position}>
      <object3D ref={ref} name={name}>
        {debug && <DebugSphere/>}
        <mesh position={pivotShift} material={skinMaterial} geometry={geometry}/>
        {children}
      </object3D>
    </group>
  );
});
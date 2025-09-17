import {forwardRef, type ReactNode, useMemo} from "react";
import DebugSphere from "@/utils/DebugSphere.tsx";
import {Mesh, type Vector2, type Vector3, type Vector3Tuple} from "three";
import {useSkinMaterial} from "@/contexts/SkinMaterial";
import {BodyPartGeometry} from "@/bodyParts/geometry/BodyPartGeometry.ts";

type BodyPartBaseProps = {
  pivotShift: Vector3 | Vector3Tuple,
  partSize: Vector3Tuple,
  textureStart: Vector2,
  name?: string,
  debug?: boolean,
  children?: ReactNode,
  position?: Vector3 | Vector3Tuple;
}

export const BodyPartBase = forwardRef<Mesh, BodyPartBaseProps>(({
  pivotShift,
  partSize,
  textureStart,
  name,
  debug,
  children,
  position
}: BodyPartBaseProps, ref) => {
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
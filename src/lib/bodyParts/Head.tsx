import type {BodyPartProps} from "./bodyPart";
import {type Mesh, MeshBasicMaterial, Vector3} from "three";
import DebugSphere from "@/utils/DebugSphere.tsx";
import {forwardRef} from "react";

const PIVOT_POINT_SHIFT = new Vector3(0, 4, 0);
const HEAD_SIZE = [8, 8, 8] as const;

const headMaterial = new MeshBasicMaterial({ color: "#f6a858" });

export const Head = forwardRef<Mesh>(({ position, rotation, debug, children, name }: BodyPartProps, ref) => {
  return (
    <group position={position} rotation={rotation}>
      { debug && <DebugSphere /> }
      <object3D ref={ref} name={name}>
        <mesh position={PIVOT_POINT_SHIFT} material={headMaterial}>
          <boxGeometry args={HEAD_SIZE} />
        </mesh>
      </object3D>
      { children }
    </group>
  );
});
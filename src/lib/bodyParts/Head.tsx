import type {BodyPartProps} from "./bodyPart";
import {MeshBasicMaterial, Vector3} from "three";
import DebugSphere from "@/utils/DebugSphere.tsx";

const HEAD_ROTATION_CENTER = new Vector3(0, 4, 0);
const HEAD_SIZE = [8, 8, 8] as const;

const headMaterial = new MeshBasicMaterial({ color: "#f6a858" });

export function Head({ position, rotation, debug }: BodyPartProps) {
  return (
    <group position={position} rotation={rotation}>
      { debug && <DebugSphere /> }
      <mesh position={HEAD_ROTATION_CENTER} material={headMaterial}>
        <boxGeometry args={HEAD_SIZE}  />
      </mesh>
    </group>
  );
}
import type {BodyPartProps} from "./bodyPart";
import DebugSphere from "@/utils/DebugSphere.tsx";
import {MeshBasicMaterial, Vector3} from "three";

const TORSO_BEND_PIVOT_CENTER_SHIFT = new Vector3(0, 3, 0);

const torsoMaterial = new MeshBasicMaterial({ color: "#6c04a8" });

export function TorsoBend({ position, rotation, debug, children, name }: BodyPartProps) {
  return (
    <object3D position={position} rotation={rotation}>
      { debug && <DebugSphere /> }
      <mesh name={name} position={TORSO_BEND_PIVOT_CENTER_SHIFT} material={torsoMaterial}>
        <boxGeometry args={[8, 6, 4]} />
      </mesh>
      { children }
    </object3D>
  );
}
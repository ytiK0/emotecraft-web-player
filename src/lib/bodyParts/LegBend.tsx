import type {BodyPartProps} from "./bodyPart";
import {bendGeometry} from "@/bodyParts/bendGeometry.ts";
import {MeshBasicMaterial, Vector3} from "three";
import DebugSphere from "@/utils/DebugSphere.tsx";

const PIVOT_POINT_GAP = new Vector3(0, -3, 0);

const bendMaterial = new MeshBasicMaterial({ color: "#b308ae" });

export function LegBend({ position, rotation, debug, children }: BodyPartProps) {
  return (
    <object3D position={position} rotation={rotation}>
      { debug && <DebugSphere /> }
      <mesh position={PIVOT_POINT_GAP} geometry={bendGeometry} material={bendMaterial} />
      { children }
    </object3D>
  );
}
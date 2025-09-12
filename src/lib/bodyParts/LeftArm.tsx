import type {BodyPartProps} from "./bodyPart";
import {type Mesh, MeshBasicMaterial, Vector3} from "three";
import DebugSphere from "@/utils/DebugSphere.tsx";
import {bendGeometry} from "@/bodyParts/bendGeometry.ts";
import {forwardRef} from "react";

const PIVOT_CENTER_SHIFT = new Vector3(1, -1, 0);
const BEND_PIVOT_CENTER_SHIFT = new Vector3(0, -3, 0);

const leftArmMaterial = new MeshBasicMaterial({ color: "#2e9f03" });

export const LeftArm = forwardRef<Mesh, BodyPartProps>(({ position, rotation, debug, children, name }: BodyPartProps, ref) => {
  return (
    <object3D position={position} rotation={rotation}>
      <object3D ref={ref} name={name}>
        { debug && <DebugSphere /> }
        <mesh position={PIVOT_CENTER_SHIFT} geometry={bendGeometry} material={leftArmMaterial} />
        { children }
      </object3D>
    </object3D>
  );
});


export const LeftArmBend = forwardRef(({ position, rotation, debug, children, name }: BodyPartProps, ref) => {
  return (
    <object3D position={position} rotation={rotation}>
      { debug && <DebugSphere /> }
      <object3D ref={ref} name={name}>
        <mesh position={BEND_PIVOT_CENTER_SHIFT} geometry={bendGeometry} />
        { children }
      </object3D>
    </object3D>
  );
});

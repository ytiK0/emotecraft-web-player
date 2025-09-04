import type {BodyPartProps} from "./bodyPart";
import {bendGeometry} from "@/bodyParts/bendGeometry.ts";
import {MeshBasicMaterial, Vector3} from "three";
import DebugSphere from "@/utils/DebugSphere.tsx";
import {forwardRef} from "react";

const ARM_PIVOT_POINT_SHIFT = new Vector3(-1, -1, 0);
const ARM_BEND_PIVOT_POINT_SHIFT = new Vector3(0, -3, 0);

const rightArmMaterial = new MeshBasicMaterial({ color: "#2e9f03" });


export const RightArm = forwardRef(({ position, rotation, debug, children }: BodyPartProps, ref) => {
  return (
    <object3D position={position} rotation={rotation}>
      { debug && <DebugSphere /> }
      <mesh ref={ref} position={ARM_PIVOT_POINT_SHIFT} geometry={bendGeometry} material={rightArmMaterial} />
      { children }
    </object3D>
  );
});

export const RightArmBend = forwardRef(({ position, rotation, debug, children }: BodyPartProps, ref) => {
  return (
    <object3D position={position} rotation={rotation}>
      { debug && <DebugSphere /> }
      <mesh ref={ref} position={ARM_BEND_PIVOT_POINT_SHIFT} geometry={bendGeometry} />
      { children }
    </object3D>
  );
});
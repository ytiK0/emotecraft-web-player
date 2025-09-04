import type {BodyPartProps} from "./bodyPart";
import {type Mesh, MeshBasicMaterial, Vector3} from "three";
import DebugSphere from "@/utils/DebugSphere.tsx";
import {bendGeometry} from "@/bodyParts/bendGeometry.ts";
import {forwardRef} from "react";

const LEFT_ARM_ROTATION_CENTER = new Vector3(1, -1, 0);
const LEFT_ARM_BEND_ROTATION_CENTER = new Vector3(0, -3, 0);

const leftArmMaterial = new MeshBasicMaterial({ color: "#2e9f03" });

export const LeftArm = forwardRef<Mesh, BodyPartProps>(({ position, rotation, debug, children }: BodyPartProps, ref) => {
  return (
    <object3D position={position} rotation={rotation}>
      { debug && <DebugSphere /> }
      <mesh ref={ref} position={LEFT_ARM_ROTATION_CENTER} geometry={bendGeometry} material={leftArmMaterial} />
      { children }
    </object3D>
  );
});


export const LeftArmBend = forwardRef(({ position, rotation, debug, children }: BodyPartProps, ref) => {
  return (
    <object3D position={position} rotation={rotation}>
      { debug && <DebugSphere /> }
      <mesh ref={ref} position={LEFT_ARM_BEND_ROTATION_CENTER} geometry={bendGeometry} />
      { children }
    </object3D>
  );
});

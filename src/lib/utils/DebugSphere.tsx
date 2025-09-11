import {Sphere} from "@react-three/drei";
import {type ColorRepresentation, MeshLambertMaterial} from "three";
import {useMemo} from "react";

interface DebugSphereProps {
  sphereSize?: number,
  axesSize?: number,
  color?: ColorRepresentation
}

const DEFAULT_SPHERE_SIZE = 0.5;
const DEFAULT_AXES_SIZE = 5;

export default function DebugSphere({sphereSize, axesSize, color}: DebugSphereProps) {
  const sphereMaterial = useMemo(() => new MeshLambertMaterial({
    color: color || "#2aeeff",
    wireframe: true,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 1
  }), [color]);

  return (
    <group name={"debug-sphere"}>
      <axesHelper args={[axesSize || DEFAULT_AXES_SIZE]}/>
      <Sphere args={[sphereSize || DEFAULT_SPHERE_SIZE]} renderOrder={999} material={sphereMaterial}/>
    </group>
  );
}
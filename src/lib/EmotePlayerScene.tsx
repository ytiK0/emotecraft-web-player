import {type CameraProps, Canvas, type GLProps} from "@react-three/fiber";
import {clsx} from "@/utils/clsx";
import {Color} from "three";
import {OrbitControls} from "@react-three/drei";
import type {EmotePlayerSceneProps} from "@/types";

const renderer: GLProps = {
  powerPreference:"low-power",
  antialias: true,
  failIfMajorPerformanceCaveat: false
};

const GroundPlane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[800, 800]}/>
      <meshLambertMaterial color={"#138800"}/>
    </mesh>
  );
};

const cameraConfig: CameraProps = {
  near: 1,
  far: 150,
  position: [0,26,40],
};

const DEFAULT_SKY_COLOR = new Color("#45d3fb");
const ORBIT_CONTROLS_TARGET = [0, 16, 0] as const;

export function EmotePlayerScene({className, style, skyColor, children, defaultScene}: EmotePlayerSceneProps) {
  return (
    <div className={clsx("emote-player-scene-wrapper", className)} style={style}>
      <Canvas camera={cameraConfig} gl={renderer}>
        <ambientLight intensity={1.2}/>
        <color attach={"background"} args={[skyColor || DEFAULT_SKY_COLOR]}/>
        <OrbitControls target={ORBIT_CONTROLS_TARGET} enablePan
                       maxDistance={50} makeDefault
        />


        { children }
        {
          defaultScene && <GroundPlane />
        }
      </Canvas>
    </div>
  );
}
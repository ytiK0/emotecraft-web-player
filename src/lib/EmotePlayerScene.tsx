import {type CameraProps, Canvas, type GLProps} from "@react-three/fiber";
import type {CSSProperties, ReactElement} from "react";
import {clsx} from "@/utils/clsx.ts";
import {Color, type ColorRepresentation} from "three";
import type EmotePlayer from "@/EmotePlayer.tsx";
import type {ChainedPlayerModel} from "@/ChainedPlayerModel.tsx";
import type {BendablePlayerModel} from "@/BendablePlayerModel.tsx";
import {OrbitControls} from "@react-three/drei";

type AllowChild = ReactElement<typeof EmotePlayer | typeof ChainedPlayerModel | typeof BendablePlayerModel>;

type EmotePlayerSceneProps = {
  className?: string,
  style?: CSSProperties,
  skyColor?: ColorRepresentation,
  children?: AllowChild | AllowChild[]
}

const renderer: GLProps = {
  powerPreference:"low-power",
  antialias: false,
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

export function EmotePlayerScene({className, style, skyColor, children}: EmotePlayerSceneProps) {
  return (
    <div className={clsx("emote-player-scene-wrapper", className)} style={style}>
      <Canvas camera={cameraConfig} gl={renderer}>
        <ambientLight intensity={1.2}/>
        <color attach={"background"} args={[skyColor || DEFAULT_SKY_COLOR]}/>
        <OrbitControls target={ORBIT_CONTROLS_TARGET} enablePan
                       maxDistance={50} makeDefault
        />


        { children }
        <GroundPlane />
      </Canvas>
    </div>
  );
}
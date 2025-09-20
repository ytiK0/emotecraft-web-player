import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Color} from "three";
import emote from "./emotes/SPE_Vampire.json";
import EmotePlayer from "@/EmotePlayer.tsx";
import type {Emote} from "@/emoteAnimation/types/animationJson";

const scene = {
  background: new Color("#45d3fb")
};

function App() {
  return (
    <>
      <Canvas style={{height: "100vh"}} camera={{position: [0, 26, 40],}} scene={scene}>
        <ambientLight intensity={1.5}/>
        {/*<axesHelper args={[30]}/>*/}
        <OrbitControls target={[0, 16, 0]} enablePan
                       maxDistance={50} makeDefault
        />


        <EmotePlayer emote={emote as Emote}/>
        <mesh rotation={[-Math.PI / 2, 0,0]} position={[0,-0.5,0]}>
          <planeGeometry args={[800, 800]} />
          <meshLambertMaterial color={"#138800"} />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;

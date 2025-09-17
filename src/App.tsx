import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Color} from "three";
import type {Emote} from "@/emoteAnimation/types/animationJson";
import EmotePlayer from "@/EmotePlayer.tsx";
import emote from "./emotes/SPE_Witch Pose.json";


const scene = {
  background: new Color("#012833")
};

function App() {
  return (
    <>
      <Canvas style={{height: "100vh"}} camera={{position: [0, 26, 40], }} scene={scene}>
        <ambientLight intensity={1.5} />
        <axesHelper args={[30]} />
        <OrbitControls target={[0,16,0]} enablePan
                       maxDistance={50} makeDefault
        />
        {/*<Grid  args={[60, 60]} sectionColor={"#089a0c"} cellColor={"#fff"} />*/}

        <EmotePlayer emote={emote as Emote} />
        {/*<BasePlayerModel />*/}
      </Canvas>
    </>
  );
}

export default App;

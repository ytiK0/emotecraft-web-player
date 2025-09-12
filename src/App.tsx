import {Canvas} from "@react-three/fiber";
import {Grid, OrbitControls} from "@react-three/drei";
import {Color} from "three";
import EmotePlayer from "@/EmotePlayer.tsx";
import emote from "./emotes/emote.json";
import type {Emote} from "@/emoteAnimation/animationJson";

const scene = {
  background: new Color("#012833")
};

function App() {
  return (
    <>
      <Canvas style={{height: "100vh"}} camera={{position: [0, 26, 40], }} scene={scene}>
        <ambientLight  />
        <axesHelper args={[30]} />
        <OrbitControls target={[0,16,0]} enablePan
                       minDistance={10} maxDistance={50}
                       maxPolarAngle={Math.PI / 1.65} makeDefault
        />
        <Grid args={[60, 60]} sectionColor={"#089a0c"} cellColor={"#fff"} />

        <EmotePlayer emote={emote as Emote} />
      </Canvas>
    </>
  );
}

export default App;

import {Canvas} from "@react-three/fiber";
import {Grid, OrbitControls} from "@react-three/drei";
import {Color} from "three";
import EmotePlayer from "@/EmotePlayer.tsx";
import {headEmote as emote} from "./headEmote.ts";

const scene = {
  background: new Color("#012833")
};

function App() {
  return (
    <>
      <Canvas style={{height: "100vh"}} camera={{position: [0, 26, 40], }}  scene={scene}>
        <ambientLight  />
        <axesHelper args={[30]} />
        <OrbitControls target={[0,16,0]} enablePan={false}
                       minDistance={10} maxDistance={50}
                       maxPolarAngle={Math.PI / 1.65} makeDefault
        />
        <Grid args={[60, 60]} sectionColor={"#089a0c"} cellColor={"#fff"} />

        <EmotePlayer emote={emote} />
      </Canvas>
    </>
  );
}

export default App;

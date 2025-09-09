import {Canvas} from "@react-three/fiber";
import {Grid, OrbitControls} from "@react-three/drei";
import {Color} from "three";
import {aggregateMoves} from "@/animationJson/aggregateMoves.ts";

const scene = {
  background: new Color("#012833")
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.agg = aggregateMoves;

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

      </Canvas>
    </>
  );
}

export default App;

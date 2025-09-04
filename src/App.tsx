import {Canvas} from "@react-three/fiber";
import {Grid, OrbitControls} from "@react-three/drei";
import {Color, Euler, MathUtils} from "three";
import {BasePlayerModel, type Pose} from "@/BasePlayerModel.tsx";
import {aggregateMoves} from "@/animationJson/aggregateMoves.ts";

const scene = {
  background: new Color("#012833")
};

const { degToRad } = MathUtils;

const testPose: Pose = {
  head: {
    rotation: new Euler(degToRad(-15), degToRad(0), degToRad(0)),
  },
  rightArm: {
    rotation: new Euler(degToRad(-125), degToRad(0), degToRad(0)),
  },
  leftArm: {
    rotation: new Euler(degToRad(-65), degToRad(0), degToRad(0)),
  },
  leftArm_bend: {
    rotation: new Euler(degToRad(0), degToRad(0), degToRad(-90)),
  }
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

        <BasePlayerModel pose={testPose && undefined} />
      </Canvas>
    </>
  );
}

export default App;

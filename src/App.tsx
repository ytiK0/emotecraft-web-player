import emote from "././emotes/SPE_EgoRock.json";
import emote1 from "././emotes/SPE_Clown Dance.json";
import {EmotePlayerScene} from "@/EmotePlayerScene.tsx";
import EmotePlayer from "@/EmotePlayer.tsx";
import {Vector3} from "three";


function App() {
  return (
     <EmotePlayerScene style={{ width: "100%", height: "100vh", margin: 0}}>
       <EmotePlayer emote={emote as Emote} playerModelType={"chain"} playerModelPosition={new Vector3(20,0,0)} />
       {/*<EmotePlayer emote={emote1 as Emote} playerModelType={"bend"} />*/}
     </EmotePlayerScene>
  );
}

export default App;

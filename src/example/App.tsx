import emote from "../emotes/SPE_D4DJ_Dance.json";
import {EmotePlayerScene} from "@/EmotePlayerScene.tsx";
import EmotePlayer from "@/EmotePlayer.tsx";
import {Vector3} from "three";
import {useEffect, useRef} from "react";
import type {EmotePlayerAPI} from "@/types/playerModel";


function App() {
  const playerApiRef = useRef<EmotePlayerAPI>(null);

  useEffect(() => {
    console.log(playerApiRef);

    const onKeyDown = (ev: KeyboardEvent) => {
      if (playerApiRef.current) {
        const playerApi = playerApiRef.current;
        if (ev.key === " ") {
          playerApi.toggle();
        } else if (ev.key === "r") {
          playerApi.restart();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
     <EmotePlayerScene style={{ width: "100%", height: "100vh", margin: 0}} defaultScene >
       <EmotePlayer ref={playerApiRef} emote={emote} playerModelType={"bend"} playerModelPosition={new Vector3(0,0,0)}  />
     </EmotePlayerScene>
  );
}

export default App;

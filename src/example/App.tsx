import {EmotePlayerScene} from "@/EmotePlayerScene.tsx";
import EmotePlayer from "@/EmotePlayer.tsx";
import {Vector3} from "three";
import {type ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import type {EmotePlayerAPI} from "@/types/playerModel";
import type {Emote} from "../lib/emoteAnimation/types/animationJson";


function App() {
  const playerApiRef = useRef<EmotePlayerAPI>(null);

  useEffect(() => {
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

  const [emote, setEmote] = useState<Emote>();

  const onEmoteChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.target;

    if (target.files) {
      const emoteFile = target.files[0];

      emoteFile.text().then((emoteJson) => {
        setEmote(JSON.parse(emoteJson));
      });
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
       <EmotePlayerScene style={{ width: "70%", height: "100vh", margin: 0}} defaultScene >
         <EmotePlayer ref={playerApiRef} emote={emote} playerModelType={"bend"} playerModelPosition={new Vector3(0,0,0)}  />
       </EmotePlayerScene>
      <div>
        <label htmlFor="emote-file-input">Эмоция</label>
        <input onChange={onEmoteChange} id={"emote-file-input"} type="file" accept={"application/json"} />
      </div>
    </div>
  );
}

export default App;

import {EmotePlayerScene} from "@/EmotePlayerScene.tsx";
import { EmotePlayer } from "@/EmotePlayer.tsx";
import {type ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import type {EmotePlayerAPI} from "@/types";


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

  const [emote, setEmote] = useState<unknown>();
  const skinSrcInputRef = useRef<HTMLInputElement>(null);
  const [skinSrc, setSkinSrc] = useState("https://mc-heads.net/skin/MrEka_");
  const [isSlim, setIsSlim] = useState(false);

  const onEmoteChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.target;

    if (target.files) {
      const emoteFile = target.files[0];

      emoteFile.text().then((emoteJson) => {
        setEmote(JSON.parse(emoteJson));
      });
    }
  }, []);

  const onSkinSrcApply = useCallback(() => {
    const skinSrcInput = skinSrcInputRef.current;
    if (skinSrcInput) {
      setSkinSrc(skinSrcInput.value);
    }
  }, []);

  const onSlimChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.target;

    setIsSlim(target.checked);
  }, []);

  return (
    <div style={{ display: "flex" }}>
       <EmotePlayerScene style={{ width: "70%", height: "100vh", margin: 0}} defaultScene >
         <EmotePlayer
           ref={playerApiRef}
           skinSrc={skinSrc}
           emote={emote}
           isSlimModel={isSlim}
         />
       </EmotePlayerScene>
      <div style={{ display: "flex", flexDirection: "column", gap: 8}}>
        <label htmlFor="emote-file-input">Эмоция</label>
        <input onChange={onEmoteChange} id={"emote-file-input"} type="file" accept={"application/json"} />
        <label htmlFor="skinsrc">Ссылка на источник скина</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 2}}>
          <input ref={skinSrcInputRef} id={"skinsrc"} type="url" defaultValue={skinSrc} />
          <button onClick={onSkinSrcApply}>Apply</button>
        </div>
        <div>
          <label htmlFor="isslim">SlimModel</label>
          <input type={"checkbox"} onChange={onSlimChange} checked={isSlim}/>
        </div>
      </div>
    </div>
  );
}

export default App;

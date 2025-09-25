import {useEffect} from "react";
import {Euler, type Vector3} from "three";
import {useEmotePlayer} from "@/hooks/useEmotePlayer.ts";
import {BendablePlayerModel} from "@/BendablePlayerModel.tsx";
import {ChainedPlayerModel} from "@/ChainedPlayerModel.tsx";

Euler.DEFAULT_ORDER = "ZYX" as "XYZ";

type EmotePlayerProps = {
  emote: Emote,
  playerModelPosition?: Vector3,
  playerModelType: "bend" | "chain"
}

export default function EmotePlayer({emote, playerModelPosition, playerModelType}: EmotePlayerProps) {
  const [player, modelRef] = useEmotePlayer(emote);

  useEffect(() => {
    const toggle = (ev: KeyboardEvent) => {
      if (ev.code === "Space" && player) {
        player.isPlaying = !player.isPlaying;
      } else if (ev.code === "KeyR" && player) {
        player.restart();
      }
    };

    window.addEventListener("keydown", toggle);

    return () => window.removeEventListener("keydown", toggle);
  }, [player]);

  if (playerModelType === "bend") {
    return <BendablePlayerModel position={playerModelPosition} ref={modelRef} />;
  } else {
    return <ChainedPlayerModel position={playerModelPosition} ref={modelRef} />;
  }
}

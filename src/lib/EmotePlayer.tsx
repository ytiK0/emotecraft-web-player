import {BasePlayerModel} from "@/BasePlayerModel.tsx";
import {useEffect} from "react";
import {Euler} from "three";
import {useEmotePlayer} from "@/hooks/useEmotePlayer.ts";

Euler.DEFAULT_ORDER = "ZYX" as "XYZ";

export default function EmotePlayer({ emote }: { emote: Emote }) {
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

  return (
    <BasePlayerModel ref={modelRef} />
  );
}

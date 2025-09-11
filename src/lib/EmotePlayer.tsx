import {BasePlayerModel} from "@/BasePlayerModel.tsx";
import {useEffect, useRef, useState} from "react";
import type {PlayerModelMesh} from "@/player";
import type {Emote} from "@/emoteAnimation/animationJson";
import {EmoteAnimationPlayer} from "@/emoteAnimation/EmoteAnimationPlayer.ts";
import {useFrame} from "@react-three/fiber";


export default function EmotePlayer({ emote }: { emote: Emote }) {
  const playerModelRef = useRef<PlayerModelMesh>(null);
  const [player, setPlayer] = useState<EmoteAnimationPlayer | null>(null);


  useFrame((_, delta) => {
    delta *= 1;
    if (player) {
      player.update(delta as Second);
    }
  });

  useEffect(() => {
    if (player) {
      player.resume();
      player.playEmote(emote);
    }
  }, [emote, player]);

  useEffect(() => {
    if (playerModelRef.current) {
      setPlayer(new EmoteAnimationPlayer(playerModelRef.current));
    }
  }, []);

  useEffect(() => {
    const toggle = (ev: KeyboardEvent) => {
      if (ev.code === "Space" && player) {
        console.log("stop");
        player.isPlaying = !player.isPlaying;
      }
    };

    window.addEventListener("keydown", toggle);

    return () => window.removeEventListener("keydown", toggle);
  }, [player]);

  return (
    <BasePlayerModel ref={playerModelRef} />
  );
}

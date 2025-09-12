import {BasePlayerModel} from "@/BasePlayerModel.tsx";
import {useEffect, useRef, useState} from "react";
import type {PlayerModelMesh} from "@/player";
import type {Emote} from "@/emoteAnimation/animationJson";
import {EmoteAnimationPlayer} from "@/emoteAnimation/EmoteAnimationPlayer.ts";
import {useFrame} from "@react-three/fiber";
import {Euler} from "three";

Euler.DEFAULT_ORDER = "ZYX" as "XYZ";

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
      // @ts-ignore only for dev
      window.anim = player.animation;
    }
  }, [emote, player]);

  useEffect(() => {
    if (playerModelRef.current) {
      setPlayer(new EmoteAnimationPlayer(playerModelRef.current));
      // @ts-ignore only for dev
      window.mesh = playerModelRef.current;
    }
  }, []);

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
    <BasePlayerModel ref={playerModelRef} />
  );
}

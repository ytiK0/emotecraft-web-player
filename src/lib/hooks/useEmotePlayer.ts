import {useEffect, useRef, useState} from "react";
import {EmoteAnimationPlayer} from "@/emoteAnimation/EmoteAnimationPlayer.ts";
import {useFrame} from "@react-three/fiber";
import type {PlayerModelMesh} from "@/player";

export function useEmotePlayer(emote: Emote) {
  const modelRef = useRef<PlayerModelMesh>(null);
  const [player, setPlayer] = useState<EmoteAnimationPlayer | null>(null);

  useFrame((_, delta) => {
    delta *= 1;
    if (player) {
      player.update(delta as Second);
    }
  });

  useEffect(() => {
    if (player) {
      player.restart();
      player.playEmote(emote);
    }
  }, [emote, player]);

  useEffect(() => {
    if (modelRef.current) {
      setPlayer(new EmoteAnimationPlayer(modelRef.current));
    }
  }, []);

  return [player, modelRef] as const;
}
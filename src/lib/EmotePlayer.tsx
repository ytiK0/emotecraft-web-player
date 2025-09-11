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

  return (
    <BasePlayerModel ref={playerModelRef} />
  );
}

import {forwardRef, useImperativeHandle} from "react";
import {Euler, type Vector3} from "three";
import {useEmotePlayer} from "@/hooks/useEmotePlayer.ts";
import {BendablePlayerModel} from "@/BendablePlayerModel.tsx";
import {ChainedPlayerModel} from "@/ChainedPlayerModel.tsx";
import {SkinMaterialProvider} from "@/contexts/SkinMaterial";
import type {EmotePlayerAPI} from "@/types/playerModel";

Euler.DEFAULT_ORDER = "ZYX" as "XYZ";

type EmotePlayerProps = {
  emote?: Emote,
  playerModelPosition?: Vector3,
  playerModelType?: "bend" | "chain",
  skinSrc?: string
}

const EmotePlayer = forwardRef<EmotePlayerAPI | undefined, EmotePlayerProps>(({emote, playerModelPosition, playerModelType, skinSrc}, ref) => {
  const [player, modelRef] = useEmotePlayer(emote);

  useImperativeHandle(ref, () => {
    if (!player) {
      return undefined;
    }

    return {
      pause: player.pause.bind(player),
      resume: player.resume.bind(player),
      restart: player.restart.bind(player),
      toggle: player.toggle.bind(player)
    };
  }, [player]);

  let PlayerModel;

  if (playerModelType === "bend") {
    PlayerModel = BendablePlayerModel;
  } else {
    PlayerModel = ChainedPlayerModel;
  }

  return (
    <SkinMaterialProvider skinSrc={skinSrc || "./skin.png"}>
      <PlayerModel position={playerModelPosition} ref={modelRef} />
    </SkinMaterialProvider>
  );
});

export default EmotePlayer;

import {forwardRef, useImperativeHandle} from "react";
import {Euler, type Vector3} from "three";
import {useEmotePlayer} from "@/hooks/useEmotePlayer.ts";
import {BendablePlayerModel} from "@/BendablePlayerModel.tsx";
import {SkinMaterialProvider} from "@/contexts/SkinMaterial";
import type {EmotePlayerAPI} from "@/types/playerModel";

Euler.DEFAULT_ORDER = "ZYX" as "XYZ";

type EmotePlayerProps = {
  emote?: Emote,
  playerModelPosition?: Vector3,
  skinSrc: string,
  isSlimModel?: boolean,
}

const EmotePlayer = forwardRef<EmotePlayerAPI | undefined, EmotePlayerProps>(({
  emote,
  playerModelPosition,
  skinSrc,
  isSlimModel
}, ref) => {
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


  return (
    <SkinMaterialProvider skinSrc={skinSrc}>
      <BendablePlayerModel position={playerModelPosition} ref={modelRef} isSlimModel={isSlimModel} />
    </SkinMaterialProvider>
  );
});

export default EmotePlayer;

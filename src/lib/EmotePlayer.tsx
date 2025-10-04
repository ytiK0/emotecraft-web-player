import {forwardRef, useImperativeHandle} from "react";
import {Euler} from "three";
import {useEmotePlayer} from "@/hooks/useEmotePlayer";
import {BendablePlayerModel} from "@/BendablePlayerModel";
import {SkinMaterialProvider} from "@/contexts/SkinMaterial";
import type {EmotePlayerAPI, EmotePlayerProps} from "@/types";

Euler.DEFAULT_ORDER = "ZYX" as "XYZ";

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

export { EmotePlayer };

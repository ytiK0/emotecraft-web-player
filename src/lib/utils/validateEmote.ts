const metaRequiredFields = ["isLoop", "returnTick", "beginTick", "endTick", "stopTick", "moves"];

function validateMove(move: object): move is Move {
  return  "tick" in move && "easing" in move;
}

function validateEmoteMeta(meta: object): meta is EmoteMeta {
  const hasFields = metaRequiredFields.reduce((acc, cur) => acc && cur in meta, true);

  const isValidMoves = "moves" in meta && Array.isArray(meta.moves) && meta.moves.reduce((acc, cur) => acc && validateMove(cur), true);

  return hasFields && isValidMoves;
}

function isEmoteA11yString(a11yStr: unknown): a11yStr is EmoteA11yString {
  if (typeof a11yStr === "string") {
    return true;
  } else if (typeof a11yStr === "object" && a11yStr) {
    return "fallback" in a11yStr && "translate" in a11yStr;
  }
  return false;
}

export function validateEmote(emote: unknown): emote is Emote {
  if (typeof emote !== "object") {
    return false;
  }

  if (emote === null || !("emote" in emote)) {
    return false;
  }

  if (typeof emote.emote !== "object" || emote.emote === null) {
    return false;
  }


  const isValidMeta = validateEmoteMeta(emote.emote);
  const isValidHead = ( "name" in emote && isEmoteA11yString(emote.name) ) && ( "description" in emote && isEmoteA11yString(emote.description) );

  return isValidMeta && isValidHead;
}
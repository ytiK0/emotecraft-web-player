import {Vector2, Vector3, type Vector3Tuple} from "three";
import type {TextureConfig} from "@/bodyParts";

export function buildTextureConfig(startX: number, startY: number, sizes?: Vector3Tuple, sidesStartX?: number, sidesStartY?: number): TextureConfig {
  const config: TextureConfig = {
    textureStart: new Vector2(startX, startY)
  };

  if (sizes) {
    config.textureSizes = new Vector3(...sizes);
  }

  if (sidesStartX !== undefined && sidesStartY !== undefined) {
    config.sidesStart = new Vector2(sidesStartX, sidesStartY);
  }

  return config;
}
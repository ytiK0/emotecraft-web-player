import {type PropsWithChildren, useMemo} from "react";
import {MeshLambertMaterial, NearestFilter, SRGBColorSpace} from "three";
import { SkinMaterialContext } from "./SkinMaterialContext";
import {useTexture} from "@react-three/drei";

export function SkinMaterialProvider({ skinSrc, children }: PropsWithChildren<{ skinSrc: string }>) {
  const texture = useTexture(skinSrc, (texture) => {
    texture.magFilter = NearestFilter;
    texture.minFilter = NearestFilter;
    texture.colorSpace = SRGBColorSpace;
  });

  const skinMaterial = useMemo(() => new MeshLambertMaterial({
    flatShading: true,
    fog: false,
    color: 0xFFFFFF,
    map: texture,
    transparent: true,
    alphaTest: 0.01,
  }), [texture]);

  return (
    <SkinMaterialContext.Provider value={skinMaterial}>
      { children }
    </SkinMaterialContext.Provider>
  );
}
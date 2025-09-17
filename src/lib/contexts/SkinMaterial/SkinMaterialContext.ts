import {Material} from "three";
import {createContext, useContext} from "react";

export const SkinMaterialContext = createContext<Material | null>(null);

export const useSkinMaterial = () => {
  const context = useContext(SkinMaterialContext);
  if (context) {
    return context;
  }
  throw Error("You should use hook inside provider");
};


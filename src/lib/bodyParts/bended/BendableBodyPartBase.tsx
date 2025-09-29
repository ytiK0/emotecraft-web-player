import {forwardRef, type ReactNode, useEffect, useImperativeHandle, useMemo, useRef} from "react";
import DebugSphere from "@/utils/DebugSphere.tsx";
import {type Group, Mesh} from "three";
import {useSkinMaterial} from "@/contexts/SkinMaterial";
import {BendableBodyPartMesh} from "@/bodyParts/base/BendableBodyPartMesh.ts";
import type {BodyPartRepresentation, DisposableBodyPartRepresentation} from "@/types/playerModel";
import type {BodyPartBaseProps} from "@/bodyParts/types/bodyPart";

type BendableBodyPartBasePops = BodyPartBaseProps & {
  bendChildren?: ReactNode,
  bendDirection?: "top" | "bottom"
};

export const BendableBodyPartBase = forwardRef<DisposableBodyPartRepresentation | undefined, BendableBodyPartBasePops>(({
  pivotShift,
  partSize,
  textureConfig,
  overlayTextureConfig,
  name,
  debug,
  children,
  position, bendChildren, bendDirection
}, ref) => {
  const skinMaterial = useSkinMaterial();
  const bodyPartMesh = useMemo(() =>
    new BendableBodyPartMesh(...partSize, textureConfig, overlayTextureConfig, skinMaterial, bendDirection),
    [bendDirection, overlayTextureConfig, partSize, skinMaterial, textureConfig]
  );

  bodyPartMesh.name = name;

  const wrapperRef = useRef<Mesh>(null);

  useImperativeHandle(ref, () => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current;

      const representation: BodyPartRepresentation = {
        name: wrapper.name,
        uuid: wrapper.uuid,
        position: wrapper.position,
        rotation: wrapper.rotation,
        scale: wrapper.scale,
        bendRotation: bodyPartMesh.bendRotation
      };

      return { representation, bindMeshes: [wrapper, bodyPartMesh] };
    }
  }, [bodyPartMesh]);

  const bendChildrenGroupRef = useRef<Group>(null);

  useEffect(() => {
    const bendChildrenGroup = bendChildrenGroupRef.current;
    if (bendChildrenGroup) {
      bodyPartMesh.setBendChildrenGroup(bendChildrenGroup);
    }
  }, [bodyPartMesh]);

  return (
    <group name={`${name}_P`} position={position}>
      <object3D ref={wrapperRef} name={name}>
        {debug && <DebugSphere/>}
        <object3D position={pivotShift}>
          {debug && <DebugSphere color={"red"}/>}
            <primitive object={bodyPartMesh} />
          {/*{*/}
          {/*  overlayBodyPartMesh*/}
          {/*  &&*/}
          {/*  <primitive object={overlayBodyPartMesh}/>*/}
          {/*}*/}
        </object3D>
        {
        bendChildren &&
          <group ref={bendChildrenGroupRef} position={[0,6,0]} name={"bend-children"}>
            {debug && <DebugSphere color={"green"}/>}
            { bendChildren }
          </group>
        }
        {children}
      </object3D>
    </group>
  );
});
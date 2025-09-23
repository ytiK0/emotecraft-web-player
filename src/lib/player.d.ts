import type {BodyPart, BodyPartProps} from "@/bodyParts/bodyPart";
import type {Euler, Mesh, Vector3} from "three";

type Pose = Partial<Record<BodyPart, Omit<BodyPartProps, "name">>>;

type PlayerModelProps = {
  position?: Vector3,
  debug?: boolean,
}

type BodyPartRepresentation = {
  name: string,
  uuid: string,
  position: Vector3,
  rotation: Euler,
  scale: Vector3,
  bendRotation?: Euler,
}

type DisposableBodyPartRepresentation = {
  representation: BodyPartRepresentation,
  bindMeshes?: Mesh[]
}

type PlayerModelMesh = Record<MovePart, BodyPartRepresentation>;
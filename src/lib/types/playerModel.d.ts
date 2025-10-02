import type {BodyPart, BodyPartProps} from "@/bodyParts/types/bodyPart";
import type {Euler, Mesh, Vector3} from "three";

type Pose = Partial<Record<BodyPart, Omit<BodyPartProps, "name">>>;

type PlayerModelProps = {
  position?: Vector3,
  debug?: boolean,
  isSlimModel?: boolean
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

type EmotePlayerAPI = {
  pause: () => void,
  resume: () => void,
  restart: () => void,
  toggle: () => void
}
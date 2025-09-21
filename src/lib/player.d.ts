import type {BodyPart, BodyPartProps} from "@/bodyParts/bodyPart";
import {type Euler, type Vector3} from "three";

type Pose = Partial<Record<BodyPart, Omit<BodyPartProps, "name">>>;

interface BodyPartRepresentation {
  name: string,
  uuid: string,
  position: Vector3,
  rotation: Euler,
  scale: Vector3,
  bendRotation?: Euler,
}

type PlayerModelMesh = Record<MovePart, BodyPartRepresentation>;
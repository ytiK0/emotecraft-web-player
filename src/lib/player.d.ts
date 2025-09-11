import type {BodyPart, BodyPartProps} from "@/bodyParts/bodyPart";
import type {Mesh} from "three";

type Pose = Partial<Record<BodyPart, BodyPartProps>>;
type PlayerModelMesh = Record<BodyPart, Mesh>
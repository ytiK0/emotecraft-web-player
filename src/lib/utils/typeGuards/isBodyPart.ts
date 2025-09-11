import type {BodyPart} from "@/bodyParts/bodyPart";

const bodyParts: BodyPart[] = [
  "head",
  "torso", "torso_bend",
  "leftArm", "leftArm_bend",
  "rightArm", "rightArm_bend",
  "leftLeg", "leftLeg_bend",
  "rightLeg", "rightLeg_bend"
];

export function isBodyPart(bodyPartOrString: string): bodyPartOrString is BodyPart  {
  return bodyParts.includes(bodyPartOrString as BodyPart);
}
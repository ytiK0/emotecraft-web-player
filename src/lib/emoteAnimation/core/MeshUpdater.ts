import type {PlayerModelMesh} from "@/player";
import type {Update} from "@/emoteAnimation/types/animationJson";
import type {BodyPart} from "@/bodyParts/bodyPart";
import {warn} from "@/utils/warn.ts";

/**
 * ratio between blender position coordinates and
 * player model coordinates
 */
const POSITION_RATIO = 4;

export class MeshUpdater {
  private readonly playerMesh: PlayerModelMesh;

  constructor(playerMesh: PlayerModelMesh) {
    this.playerMesh = playerMesh;
  }

  update(updates: Update[]) {
    for (const update of updates) {
      const { target, axis, value, transformType } = update;

      const mesh = this.playerMesh[target];
      if (!mesh) {
        warn("not found " + target + " mesh");
        continue;
      }

      const rotation = mesh.rotation;
      const position = mesh.position;

      if (transformType === "rotation") {
        rotation[axis] = value;
      } else {
        position[axis] = value * POSITION_RATIO;
      }
    }
  }

  reset() {
    for (const part in this.playerMesh) {
      const mesh = this.playerMesh[part as BodyPart];
      mesh.position.multiplyScalar(0);
      mesh.rotation.set(0,0,0);
    }
  }

}
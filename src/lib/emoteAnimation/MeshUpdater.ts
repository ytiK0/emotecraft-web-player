import type {PlayerModelMesh} from "@/player";
import type {Update} from "@/emoteAnimation/animationJson";

export class MeshUpdater {
  private readonly playerMesh: PlayerModelMesh;

  constructor(playerMesh: PlayerModelMesh) {
    this.playerMesh = playerMesh;
  }

  update(updates: Update[]) {
    for (const update of updates) {
      const { target, axis, value, transformType } = update;

      const mesh = this.playerMesh[target];
      const rotation = mesh.rotation;
      const position = mesh.position;

      if (transformType === "rotation") {
        rotation[axis] = value;
      } else {
        position[axis] = value * 4;
      }
    }
  }

}
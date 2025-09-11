import type {PlayerModelMesh} from "@/player";
import type {PositionTransformationDir, Update} from "@/emoteAnimation/animationJson";

const componentIndex: Record<PositionTransformationDir, number> = {
  "x": 0,
  "y": 1,
  "z": 2,
};

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
        mesh.setRotationFromEuler(rotation);
      } else {
        position.setComponent(componentIndex[axis], value * 4);
      }
    }
  }

}
import type {PlayerModelMesh} from "@/types/playerModel";
import {warn} from "@/utils/warn.ts";
import type {UpdatesBucket} from "@/emoteAnimation/core/UpdatesBucket.ts";

/**
 * ratio between blender position coordinates and
 * player model coordinates
 */
const POSITION_RATIO = 4;

export class MeshUpdater {
  private readonly playerMesh: PlayerModelMesh;
  private readonly updateBucket: UpdatesBucket<Update>;

  constructor(playerMesh: PlayerModelMesh, updateBucket: UpdatesBucket<Update>) {
    this.playerMesh = playerMesh;
    this.updateBucket = updateBucket;
  }

  private applyUpdate(update: Update) {
    const { target, axis, value, transformType } = update;

    const mesh = this.playerMesh[target];
    if (!mesh) {
      warn("not found " + target + " mesh");
      return;
    }

    const rotation = mesh.rotation;
    const position = mesh.position;
    const bend = mesh.bendRotation;
    const scale = mesh.scale;

    if (transformType === "rotation") {
      rotation[axis] = value;
    } else if (transformType === "position") {
      position[axis] = value * POSITION_RATIO;
    } else if (transformType === "scale") {
      scale[axis] = value;
    } else if (bend) {
      bend[axis] = value;
    }
  }

  update(updates?: Update[]) {
    if (updates === undefined) {
      this.updateBucket.forEach(this.applyUpdate.bind(this));
      this.updateBucket.clear();
    } else {
      updates.forEach(this.applyUpdate.bind(this));
    }
  }

  reset() {
    for (const part in this.playerMesh) {
      const mesh = this.playerMesh[part as keyof PlayerModelMesh];
      if (mesh === undefined) {
        continue;
      }
      mesh.position.multiplyScalar(0);
      mesh.rotation.set(0,0,0);
      mesh.scale.set(1,1,1);
      mesh.bendRotation?.set(0,0,0,);
    }
  }

}
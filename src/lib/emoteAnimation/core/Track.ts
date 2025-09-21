import {Channel} from "@/emoteAnimation/core/Channel.ts";
import type {EmoteKeyframe} from "@/emoteAnimation/core/EmoteKeyframe.ts";
import {Interpolator} from "@/emoteAnimation/core/Interpolator.ts";
import type {UpdatesBucket} from "@/emoteAnimation/core/UpdatesBucket.ts";

const TRANSFORMATION_DIR: MoveTransformationDir[] = [
  "x", "y", "z",
  "pitch", "roll", "yaw",
  "scaleX", "scaleY", "scaleZ",
  "bend", "axis"
];


export class Track {
  public readonly target: MovePart;
  private readonly channels: Channel[];

  constructor(target: MovePart, keyframes: EmoteKeyframe[]) {
    this.target = target;
    this.channels = TRANSFORMATION_DIR.map((dir) => new Channel(dir, keyframes));
  }

  getUpdates(t: Tick): Update[] {
    const updates = [];

    for (const channel of this.channels) {
      const pair = channel.getKeyframes(t);

      if (pair.next !== null) {
        const value = Interpolator.interpolate(pair, t);

        updates.push({
          axis: channel.axis,
          transformType: channel.transformType,
          target: this.target,
          value
        });
      }

    }

    return updates;
  }

  collectUpdates(t: Tick, updBucket: UpdatesBucket<Update>) {
    for (const channel of this.channels) {
      const pair = channel.getKeyframes(t);

      if (pair.next !== null) {
        const value = Interpolator.interpolate(pair, t);

        updBucket.push({
          axis: channel.axis,
          transformType: channel.transformType,
          target: this.target,
          value
        });
      }

    }
  }
}
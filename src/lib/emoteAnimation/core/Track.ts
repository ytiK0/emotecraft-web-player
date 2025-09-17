import type {BodyPart} from "@/bodyParts/bodyPart";
import {Channel} from "@/emoteAnimation/core/Channel.ts";
import type {EmoteKeyframe} from "@/emoteAnimation/core/EmoteKeyframe.ts";
import type {TransformationDir, Update} from "@/emoteAnimation/types/animationJson";
import {Interpolator} from "@/emoteAnimation/core/Interpolator.ts";

const TRANSFORMATION_DIR: TransformationDir[] = ["x", "y", "z", "pitch", "roll", "yaw"];


export class Track {
  public readonly target: BodyPart;
  private channels: Channel[];

  constructor(target: BodyPart, keyframes: EmoteKeyframe[]) {
    this.target = target;
    this.channels = TRANSFORMATION_DIR.map((dir) => new Channel(dir, keyframes));
  }

  getUpdate(t: Tick): Update[] {
    return this.channels.map((channel) => {
      const pair = channel.getKeyframes(t);

      const value = Interpolator.interpolate(pair, t);

      return {
        axis: channel.axis,
        transformType: channel.transformType,
        target: this.target,
        value
      };
    });
  }
}
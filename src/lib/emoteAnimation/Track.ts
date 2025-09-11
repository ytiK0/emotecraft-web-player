import type {BodyPart} from "@/bodyParts/bodyPart";
import {Channel} from "@/emoteAnimation/Channel.ts";
import type {EmoteKeyframe} from "@/emoteAnimation/EmoteKeyframe.ts";
import type {TransformationDir, Update} from "@/emoteAnimation/animationJson";
import {Interpolator} from "@/emoteAnimation/Interpolator.ts";

const TRANSFORMATION_DIR: TransformationDir[] = ["x", "y", "z", "pitch", "roll", "yaw"];


export class Track {
  public readonly target: BodyPart;
  private _channels: Channel[];

  constructor(target: BodyPart, keyframes: EmoteKeyframe[]) {
    this.target = target;
    this._channels = TRANSFORMATION_DIR.map((dir) => new Channel(dir, keyframes));
  }

  getUpdate(t: Tick): Update[] {
    return this._channels.map((channel) => {
      const pair = channel.getKeyframes(t);

      const value = Interpolator.interpolate(pair, t, 60);

      return {
        axis: channel.axis,
        transformType: channel.transformType,
        target: this.target,
        value
      };
    });
  }
}
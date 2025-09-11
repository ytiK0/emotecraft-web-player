import {Timeline} from "@/emoteAnimation/Timeline.ts";
import {Animation} from "@/emoteAnimation/Animation.ts";
import type {PlayerModelMesh} from "@/player";
import {MeshUpdater} from "@/emoteAnimation/MeshUpdater.ts";
import type {Emote} from "@/emoteAnimation/animationJson";

export class EmoteAnimationPlayer {
  private timeLine = new Timeline();
  private animation?: Animation;
  private readonly meshUpdater: MeshUpdater;
  private _isPlaying = false;

  get isPlaying() {
    return this._isPlaying;
  }

  set isPlaying(isPlay: boolean) {
    this._isPlaying = isPlay;
  }

  constructor(playerMesh: PlayerModelMesh) {
    this.meshUpdater = new MeshUpdater(playerMesh);
  }

  playEmote(emote: Emote) {
    this.animation = new Animation(emote.emote);
    // window.anim = this.animation;
  }

  pause() {
    this._isPlaying = false;
  }

  resume() {
    this._isPlaying = true;
  }

  update(delta: Second) {
    if (this._isPlaying && this.animation) {
      this.timeLine.update(delta);
      if (this.timeLine.currentTime >= 40 * (1/20)) {
        this.pause();
        return;
      }

      const t = this.timeLine.currentTick;
      // console.log(t);

      const updates = this.animation.getUpdates(t);
      this.meshUpdater.update(updates);
    }
  }
}
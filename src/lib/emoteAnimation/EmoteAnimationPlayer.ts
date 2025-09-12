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

  restart() {
    this.resume();
    this.timeLine.reset();
  }

  update(delta: Second) {
    if (this._isPlaying && this.animation) {
      this.timeLine.update(delta);

      const t = this.timeLine.currentTick;

      // should change to stop tick
      if (t >= 100) {
        this.pause();
      }

      const updates = this.animation.getUpdates(t);
      this.meshUpdater.update(updates);
    }
  }
}
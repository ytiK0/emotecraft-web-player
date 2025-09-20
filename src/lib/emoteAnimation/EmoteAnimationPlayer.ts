import {Timeline} from "@/emoteAnimation/core/Timeline.ts";
import {Animation} from "@/emoteAnimation/core/Animation.ts";
import type {PlayerModelMesh} from "@/player";
import {MeshUpdater} from "@/emoteAnimation/core/MeshUpdater.ts";
import type {Emote, Update} from "@/emoteAnimation/types/animationJson";
import {UpdatesBucket} from "@/emoteAnimation/core/UpdatesBucket.ts";

export class EmoteAnimationPlayer {
  private readonly timeLine = new Timeline();
  private readonly updatesBucket = new UpdatesBucket<Update>();
  private readonly meshUpdater: MeshUpdater;
  private animation?: Animation | null;
  private _isPlaying = false;

  get isPlaying() {
    return this._isPlaying;
  }

  set isPlaying(isPlay: boolean) {
    this._isPlaying = isPlay;
  }

  constructor(playerMesh: PlayerModelMesh) {
    this.meshUpdater = new MeshUpdater(playerMesh, this.updatesBucket);
  }

  playEmote(emote: Emote) {
    this.animation = null;
    this.animation = new Animation(emote.emote);
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
      const animation = this.animation;
      this.timeLine.update(delta);

      const t = this.timeLine.currentTick;

      if (animation.isLoop && this.timeLine.currentTick >= animation.endTick) {
        this.timeLine.setCurrentTimeByTick(animation.returnTick);
      }

      this.animation.collectUpdates(t, this.updatesBucket);
      this.meshUpdater.update();
    }
  }
}
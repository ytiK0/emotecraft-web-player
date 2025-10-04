import {Timeline} from "@/emoteAnimation/core/Timeline";
import {Animation} from "@/emoteAnimation/core/Animation";
import type {PlayerModelMesh} from "@/types/playerModel";
import {MeshUpdater} from "@/emoteAnimation/core/MeshUpdater";
import {UpdatesBucket} from "@/emoteAnimation/core/UpdatesBucket";

export class EmoteAnimationPlayer {
  private readonly timeLine = new Timeline();
  private readonly updatesBucket = new UpdatesBucket<Update>();
  private readonly meshUpdater: MeshUpdater;
  private animation?: Animation | null;
  private _isPlaying = true;

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

  toggle() {
    this._isPlaying = !this._isPlaying;
  }

  restart() {
    this.timeLine.reset();
    this.meshUpdater.reset();
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
      try {
        this.meshUpdater.update();
      } catch {
        this.updatesBucket.clear();
      }
    }
  }
}
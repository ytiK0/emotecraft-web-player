const TICKRATE = 20;
const TICK_IN_S = (1 / TICKRATE) as Second;

export class Timeline {
  private _currentTime: Second = 0 as Second;

  get currentTime() {
    return this._currentTime;
  }

  get currentTick() {
    return (this._currentTime / TICK_IN_S) as Tick;
  }

  update(delta: Second) {
    this._currentTime = (this._currentTime + delta) as Second;
  }

  reset() {
    this._currentTime = 0 as Second;
  }

  setCurrentTimeByTick(tick: Tick) {
    this._currentTime = (tick * TICK_IN_S) as Second;
  }
}
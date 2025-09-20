export class UpdatesBucket<T> {
  private readonly bucket: (T|null)[];
  private _size = 0;

  constructor(capacity=1 << 8) {
    this.bucket = new Array(capacity);
  }

  get size() {
    return this._size;
  }

  push(upd: T) {
    this.bucket[this._size++] = upd;
  }

  pop() {
    if (this._size >= 1) {
      const poped = this.bucket[this._size] as T;
      this.bucket[this._size--] = null;
      return poped;
    }
  }

  forEach(fn: (upd: T) => void) {
    for (let i = 0; i < this._size; i++) {
      const upd = this.bucket[i];
      if (upd) {
        fn(upd);
      }
    }
  }

  clear() {
    for (let i = 0; i < this._size; i++) this.bucket[i] = null;
    this._size= 0;
  }
}
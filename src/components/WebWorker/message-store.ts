import { Mode, Topic, MessageType } from './interface';
import { MessageStoreDefaultValue } from './data';

export default class MessageStore {
  messageSize: number;
  mode: Mode = Mode.NORMAL;
  topic: Topic = Topic.FAMILY; // 默认家人模式
  private _store: string[] = [];
  private _current: number = 0;
  constructor(options: { messageSize: number; mode: Mode; topic: Topic}) {
    this.messageSize = options.messageSize || 200;
    this.mode = options.mode || Mode.NORMAL;
    this.topic = options.topic || Topic.FAMILY;
    this.initMessageStore();
    if (this.mode === Mode.RANDOM) {
      this._current = Math.floor((Math.random() * this._store.length));
    }
  }
  private initMessageStore() {
    this._store = MessageStoreDefaultValue[this.topic];
  }
  dump() {
    // 自动化吐出一句话
    if (this.mode === Mode.RANDOM) {
      const extraIndex = Math.floor(Math.random() * (this._store.length - 1));
      self.postMessage({
        type: MessageType.DUMP,
        payload: this._store[this._current],
      })
      // 避免前后两句重复
      this._current = extraIndex >= this._current ? extraIndex + 1 :  extraIndex;
    } else {
      const extraIndex = Math.floor((this._current + 1) % this._store.length - 1);
      self.postMessage({
        type: MessageType.DUMP,
        payload: this._store[this._current],
      })
      // 避免前后两句重复
      this._current = extraIndex + 1;
    }
  }

  add(message: string) {
    // 填充内容
    this._store.push(message);
    if (this._store.length > this.messageSize) {
      this._store = this._store.slice(this._store.length - this.messageSize);
    }
  }
}

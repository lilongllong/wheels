/**
 * @file: WebWorker 的消息处理控制器
 */
import ChatWorker from './chat.worker';
import { MessageType, Mode } from './interface';
export default class WorkerManager {
  options = {
    autoTalk: true, // 开启自动聊天
    talkSource: '', // 自动聊天内容的智能程序
    talkDelay: 5000,
    autoTalkHandler: (message: string) => {},
  }
  private _worker: Worker;
  private _running = false;
  private _timer: any;
  constructor(options: { autoTalk?: boolean; talkSource?: string, autoTalkHandler?: (message: string) => void } | undefined) {
    if (options) {
      Object.assign(this.options, options);
    }
    this.options = Object.assign({}, this.options, options);

    this._worker = new ChatWorker();
    this._worker.onmessage = this._onMessageFromWorker.bind(this);
    this._worker.postMessage({
      type: MessageType.INIT,
      payload: {
        mode: Mode.RANDOM,
      }, // 采用默认配置
    })
    if (this.options.autoTalk) {
      this.initTimer();
    }
  }
  speakByUser(message: string) {
    // 立即返回一个返回，并且重置自动聊天
    this.initTimer();
    this._worker.postMessage({
      type: MessageType.ADD,
      payload: message,
    });
  }

  stop() {
    if (this.options.autoTalk) {
      this._clearTimer();
    }
  }

  restart() {
    this.initTimer();
  }

  initTimer() {
    this._running = true;
    const autoDump = () => {
      if (this._timer) {
        clearTimeout(this._timer);
        this._timer = null;
      }
      this._worker.postMessage({ type: MessageType.DUMP });
      this._timer = setTimeout(() => autoDump(), this.options.talkDelay);

    }
    if (this.options.autoTalk) {
      this._timer = setTimeout(() => autoDump(), this.options.talkDelay);
    }
  }

  _clearTimer() {
    this._running = false;
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  private _onMessageFromWorker(e: MessageEvent) {
    const { type, payload } = e?.data || {};
    switch (type) {
      case MessageType.DUMP: {
        this.options?.autoTalkHandler(payload);
      }
    }
  }
}

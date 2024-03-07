export enum Mode {
  NORMAL, // 按次序出栈
  RANDOM, // 随机出栈
}

export enum Topic {
  LOVE, // 爱情主题
  FRIEND, // 朋友主题
  FAMILY, // 家人主题
  COLLEAGUE, // 同事
}

export enum MessageType {
  DUMP,
  ADD,
  INIT,
  STOP,
}

export interface Message {
  type: MessageType;
  payload?: any;
}

import MessageStore from './message-store';
import { Message, MessageType, Mode, Topic } from './interface';

let messageStore: MessageStore;

const init = (options: { messageSize: number, mode: Mode, topic: Topic }) => {
  messageStore = new MessageStore({
    messageSize: options.messageSize || 200,
    mode: options.mode || Mode.NORMAL,
    topic: options.topic || Topic.FAMILY,
  });
}

const dump = () => {
  if (messageStore) {
    messageStore.dump();
  }
}

const addMessage = (message: string) => {
  if (messageStore) {
    messageStore.add(message);
  }
}

self.onmessage = (e) => {
  const message = e.data as Message;
  const { type, payload } = message;
  switch (type) {
    case MessageType.ADD: {
      addMessage(payload);
      break;
    }
    case MessageType.DUMP: {
      dump();
      break;
    }
    case MessageType.INIT: {
      init(payload);
      break;
    }
  }
}

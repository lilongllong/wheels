import React, { useEffect, useRef, useState } from 'react'
import { uniqueId } from 'lodash';
import { Avatar, Button, Input, List } from 'antd';
import WorkerManager from './WorkerManager';
import moment from 'moment';

const { TextArea } = Input;

interface IMessageContent {
  user: string;
  message: string;
  id: string;
  date: string;
}

const useMessageHook = function(): [IMessageContent[], (message: string) => void, WorkerManager | undefined] {
  const [messages, setMessages] = useState<IMessageContent[]>([]);
  const messagesRef = useRef<IMessageContent[]>([]);
  const workerRef = useRef<WorkerManager | undefined>();
  useEffect(() => {
    workerRef.current = new WorkerManager({
      autoTalk: true,
      autoTalkHandler: (message) => {
        messagesRef.current.push({
          user: 'you',
          message,
          id: uniqueId('you_'),
          date: `${moment().format('MM:dd HH:mm:ss')}`,
        });
        setMessages([...messagesRef.current]);
      },
    });
    return () => {
      workerRef.current?._clearTimer();
    }
  }, []);
  const userSpeak = (message: string) => {
    messagesRef.current.push({ user: 'me', message, id: uniqueId('me_'), date: `${moment().format('MM:dd HH:mm:ss')}`, })
    setMessages([...messagesRef.current]);
    workerRef.current?.speakByUser(message);
  }
  return [messages, userSpeak, workerRef.current];
}

export default function WebWorker() {
  const [messages, userSpeak, target] = useMessageHook();
  const [inoutMessage, setInputMessage] = useState<string>('');
  return (
    <div style={{ maxHeight: '1200px', minHeight: '800px', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
      <List
        rowKey="id"
        dataSource={messages}
        renderItem={(item: IMessageContent) => (<List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.user === 'me' ? 0 : 2}`} />}
            title={item.date}
            description={item.message}
          />
        </List.Item>)}
      />
      <div className="footer" style={{ display: 'flex' }}>
        <TextArea style={{ width: 'calc(100% - 72px)' }} value={inoutMessage} placeholder="请输入" allowClear onChange={(e) => setInputMessage(e.target.value)} />
        <div style={{ width: '72px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Button type="primary" onClick={() => userSpeak(inoutMessage)}>发送</Button>
          <Button type="primary" onClick={() => target?.stop()}>停止</Button>
        </div>
      </div>
    </div>
  );
}

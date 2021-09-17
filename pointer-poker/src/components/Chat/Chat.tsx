import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '../button/Button';
import './Chat.scss';
import Input from '../input/Input';
import socket from '../../socket';
import { useAppSelector } from '../../redux/hooks';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const createMassage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  const user = useAppSelector((state) => state.user);

  const sendMessage = () => {
    socket.emit('sendMessage', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('add-message', (data) => {
      const newList = messageList.slice();
      // @ts-ignore
      newList.push(data.message);
      setMessageList(newList);
    });
  }, [messageList]);

  return (
    <div className="chat-container">
      <h3>Chat</h3>
      <div className="all-messages">
        {messageList.map((msg) => {
          return (
            <div className="messageInChat" key={msg}>
              <span>{msg}</span>
            </div>
          );
        })}
      </div>
      <div className="createMessage">
        <form className="form-forSend-message">
          <input onChange={createMassage} value={message} placeholder="enter your message" />
          <Button
            label="Send message"
            onClick={sendMessage}
            className="messageBtn"
            TypeBtn="filled"
          />
        </form>
      </div>
    </div>
  );
};
export default Chat;

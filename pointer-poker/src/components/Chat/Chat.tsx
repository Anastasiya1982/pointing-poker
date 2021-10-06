import React, { ChangeEvent, useEffect, useState } from 'react';
import * as uuid from 'uuid';
import './Chat.scss';
import { useDispatch } from 'react-redux';
import socket from '../../socket';
import { useAppSelector } from '../../redux/hooks';
import Message from '../Message/Message';
import { setMessages } from '../../redux/chat/chatReducer';
import Button from '../button/Button';

const Chat = () => {
  const [message, setMessage] = useState('');
  const messagesList = useAppSelector((state) => state.chat.messages);
  const user = useAppSelector((state) => state.user);

  const dispatch = useDispatch();

  const createMassage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  const sendMessage = () => {
    socket.emit('sendMessage', { message, user });
    setMessage('');
  };
  useEffect(() => {
    socket.on('receive-message', (data) => {
      dispatch(setMessages({ data }));
    });
  }, [dispatch]);

  return (
    <div className="chat-container">
      <h3>Chat</h3>
      <div className="all-messages">
        {messagesList.map((msg) => {
          return <Message key={uuid.v4()} message={msg.message} user={msg.user} />;
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

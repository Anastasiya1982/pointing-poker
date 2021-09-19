import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '../button/Button';
import './Chat.scss';
import Input from '../input/Input';
import socket from '../../socket';
import { useAppSelector } from '../../redux/hooks';
import Message from '../Message/Message';
import { useDispatch } from 'react-redux';
import { setMessages } from '../../redux/chat/chatReducer';

const Chat = () => {
  const [message, setMessage] = useState('');
  const messagesList= useAppSelector((state) => state.chat.messages);
  const user = useAppSelector((state) => state.user);

  const dispatch=useDispatch();

  const createMassage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  const sendMessage = () => {
    socket.emit('sendMessage', {message,user});
    setMessage('');
  };
  useEffect(() => {
   socket.on("receive-message", (data) => {
      dispatch(setMessages({data:data}));
    });
  }, []);

  return (
    <div className="chat-container">
      <h3>Chat</h3>
      <div className="all-messages">
        {messagesList.map((msg,index) => {
          return (
              <Message key={index} message={msg.message} user={msg.user} />
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

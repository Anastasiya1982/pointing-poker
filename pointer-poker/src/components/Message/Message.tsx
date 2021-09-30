import React, { FC } from 'react';
import Avatar from '../avatar/Avatar';
import './Message.scss';
import logo from '../../assets/logo.svg';
import Plate from '../plate/Plate';
import Moment from 'react-moment';
import { UserState } from '../../redux/user/userReducer';
import { useAppSelector } from '../../redux/hooks';

interface MessagePropType {
  message: string;
  user: UserState;
}
const Message: FC<MessagePropType> = ({ message, user }) => {
  const player = useAppSelector((state) => state.user);
  const classNameForCurrent = player.id == user.id ? ' myMessage' : 'messageText';
  return (
    <div className="message">
      <div className="messageTop">
        <Plate className="plate-chat">
          <Avatar img={user.img} fallbackText={user.fallbackText} className="avatar-chat" />
          <div className="userName">
            {' '}
            Name : <span>{user.firstName}</span>
          </div>
        </Plate>
        <p className={classNameForCurrent}>{message}</p>
      </div>
      <div className="messageBottom" />
    </div>
  );
};
export default Message;

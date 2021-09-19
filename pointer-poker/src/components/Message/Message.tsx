import React, { FC } from 'react';
import Avatar from '../avatar/Avatar';
import './Message.scss';
import logo from '../../assets/logo.svg';
import Plate from '../plate/Plate';
import Moment from 'react-moment';
import { UserState } from '../../redux/user/userReducer';
import { useAppSelector } from '../../redux/hooks';

interface MessagePropType {
  message:string
  user:UserState
}



const Message:FC<MessagePropType>=({message,user})=>{
  const player = useAppSelector((state) => state.user);
  if(player.id==user.id){
    console.log("Happy")
  }
  return(
    <div className="message">
      <div className="messageTop">
        <Plate>
          <Avatar img={user.img} fallbackText={user.fallbackText} />
        </Plate>
         <p className="messageText">{message}</p>
      </div>
      <div className="messageBottom"></div>

    </div>
  )
}
export default Message

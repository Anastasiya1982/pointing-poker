// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import ModalView from '../modalView/ModalView';
import './contentMainPage.scss';

import { io } from 'socket.io-client';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import BtnSwitch from '../../components/btnSwitch/BtnSwitch';


const CONNECTION_PORT = 'http://localhost:5000';
let  socket:any;

const ContentMainPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [roomId, setRoomId] = useState<number | null>(5);
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState('');
  const [userInit,setUserInit]=useState(false);

   const openModalStartGame = useCallback(() => {
    setModalActive(true);
  }, []);

const geterateRandomId=()=>{
  const id=Math.floor(Math.random() *100);
  return id;
}

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    socket.on('ROOM:show all users in Room', (users: any) => {
     setUserList( users);
    });
  }, [userList]);

  const createRoom = () => {
    setRoomId(5);
    socket.emit('ROOM:JOIN', roomId);
    setModalActive(true);
  };

  function sendUser() {
    const user = {
      firstName: userName,
      lastName: 'www',
      id:geterateRandomId()
    };
    // @ts-ignore
    setUserList([...userList, { ...user }]);
    socket.emit('USER:JOIN ROOM', { roomId, user });
    setUserInit(true);
    setUserName('');
  };

 const  deleteUser=(id:number)=> {
   console.log(id);
   socket.emit("User:delete", id);
   //  удаляем юзера из стора

 }


  console.log(userList);


  return (
    <div className="wrapper-content">
      <img className="pp-img" src="../../assets/Group.svg" alt="pp_logo" />
      <div className="wrapper-start_game">
        <h2 className="h2-main_page">Start your planning:</h2>
        <span>Create session:</span>
        <Button label="Start new game" TypeBtn="filled" onClick={openModalStartGame} />
      </div>
      <div className="wrapper-connect">
        <h2 className="h2-main_page">OR:</h2>
        <p>Connect to lobby by URL:</p>
        <Input
        // value={value}
        // onChange={onChange}
        />

        <Button label="Connect" TypeBtn="filled" onClick={() => console.log('click')} />

        <ModalView active={modalActive} setActive={setModalActive}>
          <div className="wrapper-modal">
            <div className="wrapper-header">
              <div className="name-modal">Connect to lobby</div>
              <div className="name-button">Connect as Observer</div>
              <div className="wrapper-button">
                <BtnSwitch callback={function (): void {}} />
              </div>
            </div>
            <div className="wrapper-form">
              <RegistrationForm setModalIsActive={setModalActive} />
            </div>
          </div>
        </ModalView>
      </div>
    </div>
  );
};

export default ContentMainPage;
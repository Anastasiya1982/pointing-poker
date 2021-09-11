// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import ModalView from '../modalView/ModalView';
import './contentMainPage.scss';

// eslint-disable-next-line import/order
import { io } from 'socket.io-client';

const CONNECTION_PORT = 'http://localhost:5000';
let  socket;

const ContentMainPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [roomId, setRoomId] = useState<number | null>(5);
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState('');
  const [userInit,setUserInit]=useState(false)



  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    socket.on('ROOM:all users in Room', (users: any) => {
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
    };
    // @ts-ignore
    setUserList([...userList, { ...user }]);
    socket.emit('USER:JOIN ROOM', { roomId, user });
    setUserInit(true);
    setUserName('');
  }

  console.log(userList);

  return (
    <div className="wrapper-content">
      <img className="pp-img" src="../../assets/Group.svg" alt="pp_logo"/>
      <div className="wrapper-start_game">
        <h2 className="h2-main_page">Start your planning:</h2>
        <span>Create session:</span>
        <Button label="Start new game" TypeBtn="filled" onClick={createRoom}/>
      </div>
      <div className="wrapper-connect">
        <h2 className="h2-main_page">OR:</h2>
        <p>Connect to lobby by URL:</p>
        <Input
          // value={value}
          // onChange={onChange}
        />

        <Button label="Connect" TypeBtn="filled" onClick={() => console.log('click')}/>

        <ModalView active={modalActive} setActive={setModalActive}>

            <p>
              successfully connect: roomId:{roomId}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure nemo maxime ad sequi
              sapiente harum eum odit ducimus, necessitatibus placeat! Doloremque eaque suscipit,
              fugiat nihil error tenetur corporis rem dolorem!
            </p>
            <input
              value={userName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUserName(e.currentTarget.value);
              }}
              placeholder="userName"
            />
            <button onClick={sendUser}>RegisterNewUser</button>
            <div>
              {userList.map((user) => {
                return (
                  <div key={user}>
                    <div>userName: <span>{user.firstName}</span></div>
                    <div>userLastName: <span>{user.lastName}</span></div>
                  </div>
                );
              })}
            </div>
        </ModalView>
      </div>
    </div>
  );
};

export default ContentMainPage;

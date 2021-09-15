import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import ModalView from '../modalView/ModalView';
import './contentMainPage.scss';
import BtnSwitch from '../../components/btnSwitch/BtnSwitch';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { io } from 'socket.io-client';


const CONNECTION_PORT = 'http://localhost:5000';
let  socket:any;

const ContentMainPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [roomId, setRoomId] = useState<number | null>(5);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  const openModalStartGame = useCallback(() => {
    setRoomId(5);
    socket.emit('ROOM:JOIN', roomId);
    setModalActive(true);
  }, []);

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
        {/*<Input*/}
        {/*// value={value}*/}
        {/*// onChange={onChange}*/}
        {/*/>*/}

        <Button label="Connect" TypeBtn="filled" onClick={() => console.log('click')} />

        <ModalView active={modalActive} setActive={setModalActive}>
          <div className="wrapper-modal">
            <div className="wrapper-header">
              <div className="name-modal">Connect to lobby</div>
              <div className="name-button">Connect as Observer</div>
              <div className="wrapper-button">
                <BtnSwitch />
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

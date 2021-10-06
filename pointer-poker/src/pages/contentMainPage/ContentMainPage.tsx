import React, { ChangeEvent, useCallback, useState } from 'react';
import Button from '../../components/button/Button';
import ModalView from '../modalView/ModalView';
import './contentMainPage.scss';
import BtnSwitch from '../../components/btnSwitch/BtnSwitch';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import socket from '../../socket';
import Input from '../../components/input/Input';

const ContentMainPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [linkToConnect, setLinkToConnect] = useState('');
  const [type, setType] = useState('');
  const link = 'http://localhost:5000/lobby/MyRoom';

  const startGameAsScrumMuster = useCallback(() => {
    if (socket) {
      socket.emit('ROOM:JOIN', 'MyRoom');
    }
    setModalActive(true);
  }, []);

  const enterLink = (event: ChangeEvent<HTMLInputElement>) => {
    setLinkToConnect(event.currentTarget.value);
  };

  const connectToGameByLink = useCallback(() => {
    if (linkToConnect === link) {
      setType('player');
      socket.emit('ROOM:JOIN', 'MyRoom');
      setModalActive(true);
    }
  }, [linkToConnect]);

  return (
    <div className="wrapper-content">
      <img className="pp-img" src="../../assets/Group.svg" alt="pp_logo" />
      <div className="wrapper-start_game">
        <h2 className="h2-main_page">Start your planning:</h2>
        <span>Create session:</span>
        <Button label="Start new game" TypeBtn="filled" onClick={startGameAsScrumMuster} />
      </div>
      <div className="wrapper-connect">
        <h2 className="h2-main_page">OR:</h2>
        <p>Connect to lobby by URL:</p>
        <Input value={linkToConnect} onChange={enterLink} />

        <Button label="Connect" TypeBtn="filled" onClick={connectToGameByLink} />

        <ModalView active={modalActive} setActive={setModalActive}>
          <div className="wrapper-modal">
            <div className="wrapper-header">
              <div className="name-modal">Connect to lobby</div>
              <div className="name-button">Connect as Observer</div>
              <div className="wrapper-button">
                <BtnSwitch
                  checked={false}
                  id="kkk"
                  onChange={() => {
                    // console.log('switch');
                  }}
                />
              </div>
            </div>
            <div className="wrapper-form">
              <RegistrationForm setModalIsActive={setModalActive} typeOfUser={type} />
            </div>
          </div>
        </ModalView>
      </div>
    </div>
  );
};

export default ContentMainPage;

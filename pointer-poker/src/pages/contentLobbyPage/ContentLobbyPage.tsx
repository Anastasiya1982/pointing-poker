import React, { useCallback, useEffect, useState } from 'react';
import Avatar from '../../components/avatar/Avatar';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Plate from '../../components/plate/Plate';
import './contentLobbyPage.scss';
// eslint-disable-next-line import/order
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalView from '../modalView/ModalView';
import SelectModal from '../../components/selectModal/SelectModal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import socket from '../../socket';

const ContentLobbyPage = () => {
  const [modalActive, setModalActive] = useState(false);  const dispatch = useAppDispatch();
  const newUser= useAppSelector((state) => state.user);
  const players = useAppSelector((state) => state.game.users);



  useEffect(()=>{
    socket.emit('USER:JOIN ROOM', { roomId:5, newUser });
  },[newUser]);


  const master = players.find((player) => player.isScrumMaster === true);

  const openModalAddIssues = useCallback(() => {
    setModalActive(true);
  }, []);

  return (
    <div className="lobby-page-wrapper">
      <div className="date">Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)</div>
      <div className="lobby-page-scrum-master">
        <div className="lobby-page-scrum-master-title"> Scrum Master:</div>
        <Plate>
          <Avatar img={master.img} />
          <span>name:{master.firstName}</span>
        </Plate>
      </div>
      <div className="lobby-page-entry">
        <p className="lobby-page-entry-title">Link to lobby:</p>
        {/*<Input className="lobby-page-input" />*/}
        <Button
          label="Copy"
          TypeBtn="filled"
          onClick={() => console.log('click')}
          className="lobby-page-button-copy"
        />
      </div>
      <div className="lobby-page-button-container">
        {' '}
        <Button
          label="Start Game"
          TypeBtn="filled"
          onClick={() => console.log('click')}
          className="lobby-page-button-star-game"
        />
        <Button
          label="Cancel Game"
          TypeBtn="unfilled"
          onClick={() => console.log('click')}
          className="lobby-page-button-cancel-game"
        />
      </div>
      <div className="lobby-page-button-members">
        <p className="lobby-page-button-members-title">Members:</p>
        {players.map((player) => {
          return (
            <Plate>
              <Avatar img={player.img} fallbackText="avatar" />
              <span>name: {player.firstName}</span>
              <div>
                {' '}
                <span>status: {player.type}</span>
              </div>
            </Plate>
          );
        })}
      </div>
      <div className="lobby-page-issues-container">
        <div className="lobby-page-issues-title">Issues:</div>
        <div className="lobby-page-issues-plate">
          <Plate>
            <div className="lobby-page-issues-plate-title">Crete new issues</div>
            <button className="btn-add-issues" onClick={openModalAddIssues}>
              <FontAwesomeIcon className="lobby-page-icon" icon={faPlus} />
            </button>
          </Plate>
        </div>
      </div>
      <div className="lobby-page-game-settings">
        <div className="lobby-page-game-settings-title">Game settings</div>
      </div>
      <ModalView active={modalActive} setActive={setModalActive}>
        <div className="header-modal-lobby-addIssues">Create Issue</div>
        <div className="content-modal-lobby-addIssues">
          <div className="wrapper-content-modal-lobby-addIssues">
            <span>Title:</span>
            <Input />
          </div>
          <div className="wrapper-content-modal-lobby-addIssues">
            <span>Link:</span>
            <Input />
          </div>
          <div className="wrapper-content-modal-lobby-addIssues">
            <span>Priority:</span>
            <SelectModal />
          </div>
        </div>
        <div className="footer-modal-lobby-addIssues">
          <Button label="Yes" TypeBtn="filled" onClick={() => console.log('Confirm')} />
          <Button label="No" TypeBtn="unfilled" onClick={() => setModalActive(false)} />
        </div>
      </ModalView>
    </div>
  );
};

export default ContentLobbyPage;

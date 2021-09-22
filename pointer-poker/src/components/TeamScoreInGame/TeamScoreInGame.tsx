import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import Plate from '../plate/Plate';
import Avatar from '../avatar/Avatar';
import ModalView from '../../pages/modalView/ModalView';
import Button from '../button/Button';
import socket from '../../socket';

import './TeamScoreInGame.scss';

const TeamScoreInGame = () => {
  const [modalActive, setModalActive] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const players = useAppSelector((state) => state.game.users);

  const deleteUser = (id: any) => {
    let user = players.find((pl) => pl.id === id);
    socket.emit('delete user', user);
    setModalActive(false);
  };
  const openModalToDeleteUser = (id: any) => {
    setModalActive(true);
    setCurrentUserId(id);
  };
  return (
    <div className="wrapper-score">
      <div className="score-header "><span>Score</span><span>Players</span></div>
      {players.map((player=>{
        return(
          <div className="score-container">
            <div className="players">
              <Plate>
                <span>IN PROGRESS</span>
              </Plate>
              <Plate key={player.id}>
                <Avatar img={player.img} fallbackText={player.fallbackText} />
                <span>name: {player.firstName}</span>
                <button onClick={() => openModalToDeleteUser(player.id)}>Х</button>
              </Plate>
            </div>
          </div>
        )
      }))}
      <ModalView active={modalActive} setActive={setModalActive}>
        <div className="wrapper-modal">
          <h1 className="name-modal">Kick player? </h1>
          <p>Are you really want to remove playe {currentUserId} from game session?</p>
          <div className="wrapper-answer">
            <Button TypeBtn="filled" onClick={() => deleteUser(currentUserId)} label="Yes" />
            <Button TypeBtn="unfilled" onClick={() => setModalActive(false)} label="No" />
          </div>
        </div>
      </ModalView>
    </div>
  );
};
export default TeamScoreInGame;

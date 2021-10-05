import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import Plate from '../plate/Plate';
import Avatar from '../avatar/Avatar';
import ModalView from '../../pages/modalView/ModalView';
import Button from '../button/Button';
import socket from '../../socket';
import img from '../../assets/image.png';

import './TeamScoreInGame.scss';
import { UserState } from '../../redux/user/userReducer';


const TeamScoreInGame=() => {
  const [modalActive, setModalActive]=useState(false);
  const [currentUserId, setCurrentUserId]=useState(null);
  const allPlayers=useAppSelector((state) => state.game.users);
  const isScrumMusterAPlayer=useAppSelector((state) => state.game.isScrumMasterAPlayer);
  const isScrumMuster=useAppSelector((state) => state.user.isScrumMaster);

  // let players: UserState[];
  //
  // if(!isScrumMusterAPlayer){
  //   players=allPlayers.filter(player=>!player.isScrumMaster)
  // }
  // else players=allPlayers;

  // if(!isScrumMuster){
  //   if(!isScrumMusterAPlayer){
  //     players=allPlayers.filter(player=>!player.isScrumMaster)
  //   }
  //   else players=allPlayers;
  // }
  //
  // console.log(players);

  const deleteUser = (id: any) => {
    let user = allPlayers.find((pl) => pl.id === id);
    socket.emit('delete user', user);
    setModalActive(false);
  };
  const openModalToDeleteUser = (id: any) => {
    setModalActive(true);
    setCurrentUserId(id);
  };
  return (
    <div className="wrapper-score">
      <div className="score-header ">
        <span>Score</span>
        <span>Players</span>
      </div>
      {allPlayers.map((player) => {
        const voite =
          player.voite === 0 ? (
            <img src={img} alt="unknown" className='unknownImg' />
          ) : !player.voite ? (
            <span>IN PROGRESS</span>
          ) : (
            <span>{player.voite}</span>
          );
        return (
          <div className="score-container">
            <div className="players">
              <Plate>{voite}</Plate>
              <Plate key={player.id}>
                <Avatar img={player.img} fallbackText={player.fallbackText} />
                <span>name: {player.firstName}</span>
                <button onClick={() => openModalToDeleteUser(player.id)}>Х</button>
              </Plate>
            </div>
          </div>
        );
      })}
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

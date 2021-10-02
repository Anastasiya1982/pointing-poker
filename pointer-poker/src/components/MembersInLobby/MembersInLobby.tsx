import React, { useCallback, useEffect, useState } from 'react';
import Plate from '../plate/Plate';
import Avatar from '../avatar/Avatar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import socket from '../../socket';
import { setUsers } from '../../redux/game/gameReducer';
import ModalView from '../../pages/modalView/ModalView';
import Button from '../button/Button';
import './MembersInLobby.scss';

const MembersInLobby = () => {
  const [modalActive, setModalActive] = useState(false);
  const newUser = useAppSelector((state) => state.user);
  const players = useAppSelector((state) => state.game.users);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const isScrumMuster = useAppSelector((state) => state.user.isScrumMaster);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('get connected users', (users) => {
      dispatch(setUsers({ data: users }));
    });
    socket.on('get users after deleting', (users) => {
      dispatch(setUsers({ data: users }));
    });
  }, [newUser.id, dispatch, players]);

  const deleteUser = (id: any) => {
    const user = players.find((pl) => pl.id === id);
    socket.emit('delete user', (user:any)=>{
      socket.disconnect()
    });
    setModalActive(false);
  };
  const openModalToDeleteUser = useCallback((id: any) => {
    setModalActive(true);
    setCurrentUserId(id);
  }, []);

  return (
    <div className="lobby-page-button-members">
      <h3 className="lobby-page-button-members-title">Members:</h3>
      <div className="lobby-page-button-members-container">
        {players.map((player) => {
          return (
            <Plate key={player.id}>
              <Avatar img={player.img} fallbackText={player.fallbackText} />
              <span>name: {player.firstName}</span>
              <div>
                <span>status: {player.type}</span>
              </div>
              <button onClick={() => openModalToDeleteUser(player.id)}>Х</button>
            </Plate>
          );
        })}
      </div>
      <ModalView active={modalActive} setActive={setModalActive}>
        {isScrumMuster ? (
          <div className="wrapper-modal">
            <h1 className="name-modal">Kick player? </h1>
            <p>
              Are you really want to remove player <strong>{currentUserId? players[currentUserId]:''}</strong> from game
              session?
            </p>
            <div className="wrapper-answer">
              <Button TypeBtn="filled" onClick={() => deleteUser(currentUserId)} label="Yes" />
              <Button TypeBtn="unfilled" onClick={() => setModalActive(false)} label="No" />
            </div>
          </div>
        ) : (
          <div>Only ScrumMaster can delete the players! </div>
        )}
      </ModalView>
    </div>
  );
};
export default MembersInLobby;

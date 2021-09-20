import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Plate from '../plate/Plate';
import Avatar from '../avatar/Avatar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import socket from '../../socket';
import { setUsers } from '../../redux/game/gameReducer';

const MembersInLobby = () => {
  const newUser = useAppSelector((state) => state.user);
  const players = useAppSelector((state) => state.game.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('get connected users', (users) => {
      dispatch(setUsers({ data: users }));
    });
  }, [newUser.id]);

  const deleteUser = (id: number | string) => {
    socket.emit('delete user', id);
  };

  socket.on(' User deleted from room', (data) => {
    console.log('User deleted from room', data);
    // dispatch(deleteUser({ id: data.id }));
  });
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
              <button onClick={() =>{console.log("delete")}}>Х</button>
            </Plate>
          );
        })}
      </div>
    </div>
  );
};
export default MembersInLobby;

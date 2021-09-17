import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Plate from '../plate/Plate';
import Avatar from '../avatar/Avatar';
import { useAppSelector } from '../../redux/hooks';
import socket from '../../socket';
import { setUsers } from '../../redux/game/gameReducer';

const MembersInLobby = () => {
  const newUser = useAppSelector((state) => state.user);
 const players = useAppSelector((state) => state.game.users);

  const dispatch = useDispatch();


  useEffect(()=>{
    socket.on('ROOM:New user join', (data) => {
     dispatch((setUsers({data:data.user})));
  })
  },[players,newUser,dispatch]);


  // const master = players.find((player) => player.isScrumMaster === true);

  const deleteUser = (id: number) => {
    socket.emit('delete user', id);
  };

  socket.on(' User deleted from room', (data) => {
    console.log("User deleted from roo",data);
    // dispatch(deleteUser({ id: data.id }));
  });
  return (
    <div className="lobby-page-button-members">
      <h3 className="lobby-page-button-members-title">Members:</h3>
      <div className="lobby-page-button-members-container">
        {players.map((player) => {
          return (
            <Plate key={player.id}>
              <Avatar img={player.img} fallbackText="avatar" />
              <span>name: {player.firstName}</span>
              <div>
                <span>status: {player.type}</span>
              </div>
              <button onClick={() => deleteUser(player.id)}>Х</button>
            </Plate>
          );
        })}
      </div>
    </div>
  );
};
export default MembersInLobby;

import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Plate from '../plate/Plate';
import Avatar from '../avatar/Avatar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import socket from '../../socket';
import { setUsers } from '../../redux/game/gameReducer';
import { toast } from 'react-toastify';

const MembersInLobby = () => {
  const newUser = useAppSelector((state) => state.user);
 const players = useAppSelector((state) => state.game.users);

  const dispatch = useAppDispatch();


  useEffect(()=>{
    socket.on('user-submit-successfully', () => {
      console.log('user-submit-successfully');
     // dispatch((setUsers({data:data.user})));
  })

  },[]);

  useEffect(()=>{
    socket.on('get connected users',(users)=>{
      let connectedUser=users.filter((user:any)=>user.id!==newUser.id);
      dispatch(setUsers({data:connectedUser}))
    })
  },[newUser.id]);

  // const master = players.find((player) => player.isScrumMaster === true);

  const deleteUser = (id: number|string) => {
    socket.emit('delete user', id);
  };

  socket.on(' User deleted from room', (data) => {
    console.log("User deleted from room",data);
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
              <button onClick={() => deleteUser(player.id)}>Х</button>
            </Plate>
          );
        })}
      </div>
    </div>
  );
};
export default MembersInLobby;

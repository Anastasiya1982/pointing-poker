import { ChangeEvent, useEffect, useState } from 'react';
import './CheckingBackend.scss';
import axios from 'axios';
import socket from '../../socket';

export const ComponentForCheckingBackend = () => {
  // before entering
  const [roomId, setRoomId] = useState<number | null>(5);
  const [userName, setUserName] = useState('');
  const [isCreateNewGame, setIsCreateNewGame] = useState(false);
  // const [massage, setMessage] = useState('');
  const [userList, setUserList] = useState([{ firstName: 'Anna' }, { firstName: 'Marina' }]);
  const [isInit, setUserInit] = useState(false);
  // useEffect(() => {
  //   socket = io(CONNECTION_PORT);
  // }, [CONNECTION_PORT]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    socket.on('ROOM: user join the room', (userList) => {
      console.log('Новый пользователь', userList);
    });
  }, []);

  const createSession = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomId(Number(e.currentTarget.value));
  };

  const createRoom = () => {
    axios.post('http://localhost:5000/rooms', { roomId }).then((res) => {
      setIsCreateNewGame(true);
      console.log(res.config.data);
      // dispatch(setNewGame)
    });
    socket.emit('ROOM:JOIN', roomId);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function sendUser() {
    const user = {
      firstName: userName,
      lastName: 'www',
      id: socket.id,
      status: 'player',
      type: 'player',
      value: -1,
      avatar: '',
    };
    setUserInit(true);
    // @ts-ignore
    setUserList([...userList, { ...user }]);
    socket.emit('USER:JOIN ROOM', { roomId, user });
    setUserName('');
  }

  return (
    <>
      <div>
        {!isCreateNewGame ? (
          <div>
            <input type="text" onChange={createSession} />
            <button onClick={createRoom}>Enter the room</button>
          </div>
        ) : (
          <div className="registerForm">
            <input
              value={userName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUserName(e.currentTarget.value);
              }}
              placeholder="userName"
            />
            <button onClick={sendUser}>RegisterNewUser</button>
          </div>
        )}
      </div>
      {isInit ? (
        <div>
          {userList.map((user) => {
            return (
              <div key={user}>
                <span>userName:</span>
                <span>{user.firstName}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div> user not enter </div>
      )}
    </>
  );
};

export default ComponentForCheckingBackend;

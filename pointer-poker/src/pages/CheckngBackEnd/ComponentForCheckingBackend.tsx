import { ChangeEvent, useEffect, useState } from 'react';
import './CheckingBackend.scss';

const io = require('socket.io-client');

let socket: any;
const CONNECTION_PORT = 'localhost:5000';

export const ComponentForCheckingBackend = () => {
  // before entering
  const [room, setRoom] = useState(' ');
  const [userName, setUserName] = useState('');
  const [loggedIn, setLoggidIn] = useState(false);

  // after enter the room
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [massage, setMessage] = useState('');
  const [userList, setUserList] = useState([{ userName: 'Anna' }, { userName: 'Marina' }]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on('receive_user', (data: any) => {
      setUserList([...userList, data]);
    });
  });
  const connectToRoom = () => {
    setLoggidIn(true);
    console.log('connect to room');
    socket.emit('join_room', room);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function sendUser() {
    const user = {
      room,
      content: {
        userName,
      },
    };
    socket.emit('join_user', user);
    // @ts-ignore
    setUserList([...userList, user.content]);
  }

  return (
    <div>
      {!loggedIn ? (
        <div>
          <input
            value={userName}
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUserName(e.currentTarget.value);
            }}
            placeholder="Name..."
          />
          <input
            value={room}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setRoom(e.currentTarget.value);
            }}
            placeholder="Room"
          />
          <button onClick={connectToRoom}>Enter the room</button>
        </div>
      ) : (
        <div>
          Lobby Room
          <div>
            user <b>{userName}</b> want to enter the lobby{' '}
          </div>{' '}
          <button onClick={sendUser}>Add to lobby</button>
          <div>
            <div>
              {' '}
              {userList.map((user: any, index: number) => {
                // eslint-disable-next-line react/no-array-index-key
                return (
                  <div key={index}>
                    <span>userName:</span>
                    {user.userName}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentForCheckingBackend;

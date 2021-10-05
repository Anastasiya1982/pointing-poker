import React, { ChangeEvent, FC, useState } from 'react';
import { setTimeOfRound } from '../../redux/game/gameReducer';
import { useAppDispatch } from '../../redux/hooks';
import Button from '../button/Button';
import Input from '../input/Input';
import socket from '../../socket';

interface Props {
  setModalActive: (modalActive: boolean) => void;
}

const CreateTimeLobby: FC<Props> = ({ setModalActive }) => {
  const dispatch = useAppDispatch();
  const [timerSeconds, setTimerSeconds] = useState('');

  const onHandleTimerSecondsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimerSeconds(event.target.value);
  };

  const handleAddTime = (event: ChangeEvent<HTMLButtonElement>) => {
    const value = timerSeconds;
    dispatch(setTimeOfRound(value));
    socket.emit("send Timer Value to all users",value)
    setTimerSeconds('');
    setModalActive(false);
  };
  return (
    <div>
      <div className="header-modal-lobby-addCards">Create Time</div>
      <div className="content-modal-lobby-addCards">
        <div className="wrapper-content-modal-lobby-addCards">
          <span>Seconds:</span>
          <Input onChange={onHandleTimerSecondsChange} placeholder="seconds" value={timerSeconds} />
        </div>
      </div>
      <div className="footer-modal-lobby-addCards">
        <Button label="Yes" TypeBtn="filled" onClick={handleAddTime} />
        <Button label="No" TypeBtn="unfilled" onClick={() => setModalActive(false)} />
      </div>
    </div>
  );
};

export default CreateTimeLobby;

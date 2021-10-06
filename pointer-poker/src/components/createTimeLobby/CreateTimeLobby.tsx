import React, { ChangeEvent, FC, useState } from 'react';
import { setTimeOfRound } from '../../redux/game/gameReducer';
import { useAppDispatch } from '../../redux/hooks';
import Button from '../button/Button';
import Input from '../input/Input';
import socket from '../../socket';
import './createTimeLobby.scss';

interface Props {
  setModalActive: (modalActive: boolean) => void;
}

const CreateTimeLobby: FC<Props> = ({ setModalActive }) => {
  const dispatch = useAppDispatch();
  const [timerSeconds, setTimerSeconds] = useState('');

  const onHandleTimerSecondsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimerSeconds(event.target.value);
  };

  const handleAddTime = () => {
    const value = timerSeconds;

    if (!/^[0-9]+$/.test(value)) {
      return;
    }
    dispatch(setTimeOfRound(value));
    socket.emit('send Timer Value to all users', value);
    setTimerSeconds('');
    setModalActive(false);
  };
  return (
    <div>
      <div className="header-modal-lobby-addTime">Create Time</div>
      <div className="content-modal-lobby-addTime">
        <div className="wrapper-content-modal-lobby-addTime">
          <span>Seconds:</span>
          <Input
            className="create-time-input"
            onChange={onHandleTimerSecondsChange}
            placeholder="Enter the total number of seconds"
            value={timerSeconds}
          />
        </div>
      </div>
      <div className="footer-modal-lobby-addTime">
        <Button label="Yes" TypeBtn="filled" onClick={handleAddTime} />
        <Button label="No" TypeBtn="unfilled" onClick={() => setModalActive(false)} />
      </div>
    </div>
  );
};

export default CreateTimeLobby;

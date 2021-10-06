import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from '../button/Button';
import './timer.scss';
import socket from '../../socket';
import {
  setStartIssueRound,
  setStopIssueRound,
  // setTimeOfRound,
  // setTimer,
  setIsTimerStart,
  setTimeOfRound,
} from '../../redux/game/gameReducer';

const Timer = () => {
  const dispatch = useAppDispatch();
  const roundTime = useAppSelector((state) => state.game.timeOfRound);
  const [seconds, setSeconds] = useState(roundTime);
  const minutes = Math.floor(seconds / 60);
  const correctSeconds = seconds % 60;
  const isScrumMuster = useAppSelector((state) => state.user.isScrumMaster);
  const isRoundStart = useAppSelector((state) => state.game.startIssueRound);
  const isTimerStart = useAppSelector((state) => state.game.isTimerStart);

  useEffect(() => {
    if (!isTimerStart) {
      setTimeOfRound(roundTime);
    }
  }, [isTimerStart, roundTime]);

  useEffect(() => {
    let timer: number | undefined;
    if (seconds > 0 && isTimerStart && isRoundStart) {
      timer = setTimeout(() => setSeconds((prevSeconds: number) => prevSeconds - 1), 1000);
    } else {
      dispatch(setIsTimerStart({ value: false }));
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [seconds, isTimerStart, isRoundStart, dispatch]);

  const handleStartRound = () => {
    socket.emit('StartIssueRound', true);
    dispatch(setIsTimerStart({ value: true }));
    dispatch(setStartIssueRound(true));
  };
  const handleStopRound = () => {
    socket.emit('StopIssueRound', { isRoundStop: true, voite: null, timerStart: false });
    dispatch(setIsTimerStart({ value: false }));
    dispatch(setStopIssueRound(true));
    setStartIssueRound(false);
  };

  return (
    <div>
      {/* {seconds ? ( */}
      <div className="timer-container">
        {isScrumMuster ? (
          <>
            <Button label="start" TypeBtn="filled" onClick={handleStartRound} />
            <Button label="stop" TypeBtn="filled" onClick={handleStopRound} />
          </>
        ) : null}

        <div id="clockdiv">
          <div>
            <div className="smalltext">Minutes</div>
            <span className="minutes" id="minute">
              {minutes < 10 ? `0${minutes}` : minutes}
            </span>
          </div>
          <div>
            <div className="smalltext">Seconds</div>
            <span className="seconds" id="second">
              {correctSeconds < 10 ? `0${correctSeconds}` : correctSeconds}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;

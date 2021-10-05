import React, { useEffect, useState, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from '../button/Button';
import './timer.scss';
import socket from '../../socket';
import { useDispatch } from 'react-redux';
import {
  setStartIssueRound,
  setStopIssueRound,
  setTimeOfRound,
  setTimer,
} from '../../redux/game/gameReducer';
import { setIsTimerStart } from '../../redux/game/gameReducer';

const Timer = () => {
  const dispatch = useAppDispatch();
  const [timerStart, setTimerStart] = useState(false);
  const roundTime = useAppSelector((state) => state.game.timeOfRound);
  const [seconds, setSeconds] = useState(roundTime);
  const minutes = Math.floor(seconds / 60);
  const correctSeconds = seconds % 60;
  const isScrumMuster = useAppSelector((state) => state.user.isScrumMaster);
  const isTimerNeeded = useAppSelector((state) => state.game.isTimerNeeded);
  const isRoundStart = useAppSelector((state) => state.game.startIssueRound);
  const isTimerStart = useAppSelector((state) => state.game.isTimerStart);
  const value = isTimerStart ? 'stop' : 'start';

  const users = useAppSelector((state) => state.game.users);

  console.log(minutes);

  if (!isScrumMuster) {
    console.log('Round for players:', isRoundStart);
  }
  console.log(roundTime);
  useEffect(() => {
    let timer: number | undefined;
    if (seconds > 0 && isTimerStart && isRoundStart) {
      timer = setTimeout(() => setSeconds((prevSeconds: number) => prevSeconds - 1), 1000);
    } else {
      dispatch(setIsTimerStart({ value: false }));
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [seconds, isTimerStart, isRoundStart]);

  console.log('isTimerStart', isTimerStart);

  const handleStartRound = () => {
    // if(value==='start'){
    //   socket.emit("StopIssueRound", ({
    //     isRoundStop:true,
    //     voite:null,
    //     timerStart:false
    //
    //   }));
    //   dispatch(setIsTimerStart({value:false}))
    // }
    socket.emit('StartIssueRound', true);
    dispatch(setIsTimerStart({ value: true }));
    dispatch(setStartIssueRound(true));
  };
  const handleStopRound = () => {
    socket.emit('StopIssueRound', { isRoundStop: true, voite: null, timerStart: false });
    console.log('stopTimer');
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
        {isTimerNeeded ? (
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
        ) : null}
      </div>
      {/* ) : ( */}
      {/* <Button TypeBtn="filled" onClick={() => setSeconds(120)} label="Once again" /> */}
      {/* )} */}
    </div>
  );
};

export default Timer;

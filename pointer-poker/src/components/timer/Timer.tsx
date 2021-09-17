import React, { useEffect, useState, Fragment } from 'react';
import Button from '../button/Button';
import './timer.scss';

const Countdown = ({ roundTime }: { roundTime: number }) => {
  const [seconds, setSeconds] = useState(roundTime);
  const [timerActive, setTimerActive] = useState(false);
  const minutes = Math.floor(seconds / 60);
  const correctSeconds = seconds % 60;
  const value = timerActive ? 'stop' : 'start';

  useEffect(() => {
    let timer;
    if (seconds > 0 && timerActive) {
      timer = setTimeout(() => setSeconds((prevSeconds) => prevSeconds - 1), 1000);
    } else {
      setTimerActive(false);
      clearTimeout(timer);
    }
  }, [seconds, timerActive]);

  return (
    <div>
      {seconds ? (
        <div className="timer-container">
          <Button label={value} TypeBtn={'filled'} onClick={() => setTimerActive(!timerActive)} />
          <div id="clockdiv">
            <div>
              <div className="smalltext">Minutes</div>
              <span className="minutes" id="minute">
                {minutes}
              </span>
            </div>
            <div>
              <div className="smalltext">Seconds</div>
              <span className="seconds" id="second">
                {correctSeconds}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setSeconds(60)}>ещё раз</button>
      )}
    </div>
  );
};

export default Countdown;

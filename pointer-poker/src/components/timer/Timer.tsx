import React, { useRef, useEffect, useState, Fragment } from 'react';
import './timer.scss';

const Countdown = () => {
  const [seconds, setSeconds] = useState(20);
  const [minutes, setMinutes] = useState(2);
  const [timerActive, setTimerActive] = useState(false);

  React.useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 100, seconds - 1);
      if (seconds === 0) {
        setTimeout(setMinutes, 100, minutes - 1);
      }
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive, minutes]);

  return (
    <div>
      {seconds ? (
        // <Fragment>
        <div>
          <button onClick={() => setTimerActive(!timerActive)}>
            {timerActive ? 'stop' : 'start'}
          </button>
          <div id="clockdiv">
            <div>
              <span className="minutes" id="minute">
                {minutes}
              </span>
              <div className="smalltext">Minutes</div>
            </div>
            <div>
              <span className="seconds" id="second">
                {seconds}
              </span>
              <div className="smalltext">Seconds</div>
            </div>
          </div>
        </div>
      ) : (
        // </Fragment>
        <button onClick={() => setSeconds(60)}>ещё раз</button>
      )}
    </div>
  );
};

export default Countdown;

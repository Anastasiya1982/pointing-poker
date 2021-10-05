import React from 'react';
import { useAppSelector } from '../../redux/hooks';

const TimerInLobby = () => {
  const roundTime = useAppSelector((state) => state.game.timeOfRound);

  const minutes = Math.floor(roundTime / 60);
  const correctSeconds = roundTime % 60;
  return (
    <div>
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
  );
};

export default TimerInLobby;

import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  setIsScrumMasterAPlayer,
  setIsTimerNeeded,
  setScoreType,
} from '../../redux/game/gameReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import BtnSwitch from '../btnSwitch/BtnSwitch';
import Countdown from '../timer/Timer';
import './gameSettings.scss';

const GameSettings = () => {
  const dispatch = useAppDispatch();
  const isTimerNeeded = useAppSelector((state) => state.game.isTimerNeeded);
  const isScrumMasterAPlayer = useAppSelector((state) => state.game.isScrumMasterAPlayer);
  const scoreType = useAppSelector((state) => state.game.scoreType);
  const value = scoreType === 'story point' ? 'SP' : '%';

  const handleIsScrumMasterAPlayer = useCallback(
    (event) => {
      dispatch(setIsScrumMasterAPlayer(event.target.checked));
    },
    [dispatch],
  );

  const handleIsTimerNeeded = useCallback(
    (event) => {
      dispatch(setIsTimerNeeded(event.target.checked));
    },
    [dispatch],
  );

  const changeInputScoreType = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setScoreType({ value: event.currentTarget.value }));
    },
    [dispatch],
  );

  return (
    <div className="lobby-page-game-settings">
      <div className="lobby-page-game-settings-title">Game settings</div>
      <div className="lobby-page-game-settings-container">
        <div>Scram master as player:</div>
        <BtnSwitch
          id="isMasterAPlayer"
          checked={isScrumMasterAPlayer}
          onChange={handleIsScrumMasterAPlayer}
        />
      </div>
      <div className="lobby-page-game-settings-container">
        <div> Is timer needed:</div>
        <BtnSwitch id="isTimer" checked={isTimerNeeded} onChange={handleIsTimerNeeded} />
      </div>

      <div className="lobby-page-game-settings-container-input">
        <div>Score type:</div>
        <label className="lobby-page-game-settings-label" htmlFor="settings">
          <select
            className="lobby-page-game-settings-select"
            name="settings"
            onChange={changeInputScoreType}
          >
            <option defaultValue="story point">story point</option>
            <option value="percent">percent</option>
          </select>
        </label>
      </div>

      <div className="lobby-page-game-settings-container-input">
        <div>Score type (Short):</div>
        <p className="lobby-page-game-settings-short">{value}</p>
      </div>
      {isTimerNeeded ? (
        <div className="lobby-page-game-settings-round-time-container">
          <div>Round Time:</div>
          <Countdown roundTime={90} />
        </div>
      ) : null}
    </div>
  );
};

export default GameSettings;

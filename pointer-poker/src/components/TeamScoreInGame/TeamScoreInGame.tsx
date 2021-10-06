import React from 'react';
import * as uuid from 'uuid';
import { useAppSelector } from '../../redux/hooks';
import Plate from '../plate/Plate';
import Avatar from '../avatar/Avatar';

import img from '../../assets/image.png';

import './TeamScoreInGame.scss';
import { UserState } from '../../redux/user/userReducer';

const TeamScoreInGame = () => {
  const allPlayers = useAppSelector((state) => state.game.users);
  const isScrumMusterAPlayer = useAppSelector((state) => state.game.isScrumMasterAPlayer);
  let players: UserState[];

  if (!isScrumMusterAPlayer) {
    players = allPlayers.filter((player) => !player.isScrumMaster);
  } else players = allPlayers;

  return (
    <div className="wrapper-score">
      <div className="score-header ">
        <span>Score</span>
        <span>Players</span>
      </div>
      {players.map((player) => {
        const voite =
          // eslint-disable-next-line no-nested-ternary
          player.voite === 0 ? (
            <img src={img} alt="unknown" className="unknownImg" />
          ) : !player.voite ? (
            <span>IN PROGRESS</span>
          ) : (
            <span>{player.voite}</span>
          );
        return (
          <div className="score-container" key={uuid.v4()}>
            <div className="players">
              <Plate>{voite}</Plate>
              <Plate key={player.id}>
                <Avatar img={player.img} fallbackText={player.fallbackText} />
                <span>name: {player.firstName}</span>
              </Plate>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default TeamScoreInGame;

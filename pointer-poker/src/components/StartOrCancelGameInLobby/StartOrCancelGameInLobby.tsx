import { FC, useEffect, useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import './StartOrCancelGameInLobby.scss';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../redux/hooks';
import socket from '../../socket';
import { useDispatch } from 'react-redux';
import { setStartGame } from '../../redux/game/gameReducer';

const StartOrCancelGameInLobby: FC<any> = () => {
  const cards = useAppSelector((state) => state.game.cards);
  const history = useHistory();

  const startGame = () => {
    socket.emit('set all cards to game', cards);
    socket.emit('ready to start game', true);
    history.push('/game');
  };

  return (
    <>
      <div className="lobby-page-entry">
        <p className="lobby-page-entry-title">Link to lobby:</p>
        <Input
          className="lobby-page-input"
          onChange={() => {
            console.log('enter the inventation link');
          }}
          value="http://localhost:5000/lobby/MyRoom"
        />
        <Button
          label="Copy"
          TypeBtn="filled"
          onClick={() => console.log('Copy link')}
          className="lobby-page-button-copy"
        />
      </div>
      <div className="lobby-page-button-container">
        <Button
          label="Start Game"
          TypeBtn="filled"
          onClick={startGame}
          className="lobby-page-button-star-game"
        />
        <Button
          label="Cancel Game"
          TypeBtn="unfilled"
          onClick={() => console.log('click')}
          className="lobby-page-button-cancel-game"
        />
      </div>
    </>
  );
};

export default StartOrCancelGameInLobby;

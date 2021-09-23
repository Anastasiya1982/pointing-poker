import { FC,  useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import './StartOrCancelGameInLobby.scss';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../redux/hooks';
import socket from '../../socket';


const StartOrCancelGameInLobby: FC<any> = () => {
  const [text, setText]=useState("http://localhost:5000/lobby/MyRoom")
  const cards = useAppSelector((state) => state.game.cards);
  const history = useHistory();
  const isScrumMasterAPlayer=useAppSelector((state) => state.game.isScrumMasterAPlayer);
  const scoreType=useAppSelector((state) => state.game.scoreType);
  const issues=useAppSelector((state) => state.issie.issues);

  const startGame = () => {
    // socket.emit('set all cards to game',
    socket.emit('ready to start game', ({
      cards,isScrumMasterAPlayer,issues, scoreType,startGame:true
    }));
    history.push('/game');
  };

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    alert('Text copied');
  }
  return (
    <>
      <div className="lobby-page-entry">
        <p className="lobby-page-entry-title">Link to lobby:</p>
        <Input
          className="lobby-page-input"
          onChange={() => {
            console.log('enter the inventation link');} }
          value={text}
        />
        <Button
          label="Copy"
          TypeBtn="filled"
          onClick={copy}
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

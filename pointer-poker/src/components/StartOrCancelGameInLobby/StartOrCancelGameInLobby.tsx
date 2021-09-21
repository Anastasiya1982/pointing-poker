import { FC } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import './StartOrCancelGameInLobby.scss';

const StartOrCancelGameInLobby: FC<any> = () => {
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
          onClick={() => console.log('click')}
          className="lobby-page-button-copy"
        />
      </div>
      <div className="lobby-page-button-container">
        <Button
          label="Start Game"
          TypeBtn="filled"
          onClick={() => console.log('click')}
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

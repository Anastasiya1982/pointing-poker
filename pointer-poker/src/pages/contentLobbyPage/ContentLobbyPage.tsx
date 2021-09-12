import React from 'react';
import Avatar from '../../components/avatar/Avatar';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Plate from '../../components/plate/Plate';
import './contentLobbyPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

const ContentLobbyPage = () => {
  return (
    <div className="lobby-page-wrapper">
      <div className="date">Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)</div>
      <div className="lobby-page-scrum-master">
        <div className="lobby-page-scrum-master-title"> Scrum Master:</div>
        <Plate>
          <Avatar />
        </Plate>
      </div>
      <div className="lobby-page-entry">
        <p className="lobby-page-entry-title">Link to lobby:</p>
        <Input className={'lobby-page-input'} />
        <Button
          label={'Copy'}
          TypeBtn={'filled'}
          onClick={() => console.log('click')}
          className={'lobby-page-button-copy'}
        />
      </div>
      <div className="lobby-page-button-container">
        {' '}
        <Button
          label={'Start Game'}
          TypeBtn={'filled'}
          onClick={() => console.log('click')}
          className={'lobby-page-button-star-game'}
        />
        <Button
          label={'Cancel Game'}
          TypeBtn={'unfilled'}
          onClick={() => console.log('click')}
          className={'lobby-page-button-cancel-game'}
        />
      </div>
      <div className="lobby-page-button-members">
        <p className="lobby-page-button-members-title">Members:</p>
      </div>
      <div className="lobby-page-issues-container">
        <div className="lobby-page-issues-title">Issues:</div>
        <div className="lobby-page-issues-plate">
          <Plate>
            <div className="lobby-page-issues-plate-title">Crete new issues</div>

            <FontAwesomeIcon className="lobby-page-icon" icon={faPlus} />
          </Plate>
        </div>
      </div>
      <div className="lobby-page-game-settings">
        <div className="lobby-page-game-settings-title">Game settings</div>
      </div>
    </div>
  );
};

export default ContentLobbyPage;

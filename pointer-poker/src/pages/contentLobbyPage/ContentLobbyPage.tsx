import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Avatar from '../../components/avatar/Avatar';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Plate from '../../components/plate/Plate';
import './contentLobbyPage.scss';
// eslint-disable-next-line import/order
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalView from '../modalView/ModalView';
import SelectModal from '../../components/selectModal/SelectModal';
import Chat from '../../components/Chat/Chat';
import MembersInLobby from '../../components/MembersInLobby/MembersInLobby';
import { useAppSelector } from '../../redux/hooks';
import GameSettings from '../../components/gameSettings/GameSettings';
import IssueComponent from '../../components/Issue/IssueComponent';
import socket from '../../socket';
import { setScrumMusterData } from '../../redux/game/gameReducer';
import StartOrCancelGameInLobby from '../../components/StartOrCancelGameInLobby/StartOrCancelGameInLobby'
import CardsLobby from '../../components/cardsLobby/CardsLobby';

interface Props {
  date: string;
}

const ContentLobbyPage: FC<Props> = () => {
  const [modalActive, setModalActive] = useState(false);
  const players = useAppSelector((state) => state.game.users);
  const user = useAppSelector((state) => state.user);

  const openModalAddIssues = useCallback(() => {
    setModalActive(true);
  }, []);

  //   const master = players.find((player) => player.isScrumMaster === true);
  useEffect(() => {
    socket.on('show-ScrumMuster-Data', (user) => {
      dispatch(setScrumMusterData({ data: user }));
    });
  }, [dispatch]);

  return (
    <div className="lobby-page-content">
      <div className="lobby-page-wrapper">
        <div className="date">Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)</div>
        <div className="lobby-page-scrum-master">
          <div className="lobby-page-scrum-master-title"> Scrum Master:</div>
          <Plate>
            <Avatar img={user.img} fallbackText={user.fallbackText} />
            <span>name:{user.firstName}</span>
          </Plate>
        </div>
        <div className="lobby-page-entry">
          <p className="lobby-page-entry-title">Link to lobby:</p>
          <Input
            className="lobby-page-input"
            onChange={() => {
              console.log('enter the inventation link');
            }}
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
        <MembersInLobby />
        <div className="lobby-page-issues-container">
          <div className="lobby-page-issues-title">Issues:</div>
          <div className="lobby-page-issues-plate">
            <Plate>
              <div className="lobby-page-issues-plate-title">Crete new issues</div>
              <button className="btn-add-issues" onClick={openModalAddIssues}>
                <FontAwesomeIcon className="lobby-page-icon" icon={faPlus} />
              </button>
            </Plate>
          </div>
        </div>
        <GameSettings />
        <CardsLobby />
        <ModalView active={modalActive} setActive={setModalActive}>
          <div className="header-modal-lobby-addIssues">Create Issue</div>
          <div className="content-modal-lobby-addIssues">
            <div className="wrapper-content-modal-lobby-addIssues">
              <span>Title:</span>
              <Input
                onChange={() => {
                  console.log('USSUES TITLE');
                }}
              />
            </div>
            <div className="wrapper-content-modal-lobby-addIssues">
              <span>Link:</span>
              <Input
                onChange={() => {
                  console.log('link');
                }}
              />
            </div>
            <div className="wrapper-content-modal-lobby-addIssues">
              <span>Priority:</span>
              <SelectModal
                onChange={() => {
                  console.log('is modal open');
                }}
                value="value"
              />
            </div>
          </div>
          <div className="footer-modal-lobby-addIssues">
            <Button label={'Yes'} TypeBtn={'filled'} onClick={() => console.log('Confirm')} />
            <Button label={'No'} TypeBtn={'unfilled'} onClick={() => setModalActive(false)} />
          </div>
        </ModalView>
        <Avatar img={master?.img} fallbackText={master?.fallbackText} />
            <span>name:{master?.firstName}</span>
          </Plate>
        </div>
        {isScrumMuster ? <StartOrCancelGameInLobby /> : ''}
        <MembersInLobby />
        {isScrumMuster ? (
          <>
            <IssueComponent  />
            <GameSettings />
          </>
        ) : (
          ''
        )}
      </div>
      <Chat />
    </div>
  );
};

export default ContentLobbyPage;

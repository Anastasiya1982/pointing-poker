import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Avatar from '../../components/avatar/Avatar';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Plate from '../../components/plate/Plate';
import './contentLobbyPage.scss';
import ModalView from '../modalView/ModalView';
import SelectModal from '../../components/selectModal/SelectModal';
import Chat from '../../components/Chat/Chat';
import MembersInLobby from '../../components/MembersInLobby/MembersInLobby';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import GameSettings from '../../components/gameSettings/GameSettings';
import IssueComponent from '../../components/Issue/IssueComponent';
import socket from '../../socket';
import { setScrumMusterData } from '../../redux/game/gameReducer';
import StartOrCancelGameInLobby from '../../components/StartOrCancelGameInLobby/StartOrCancelGameInLobby';
import CardsLobby from '../../components/cardsLobby/CardsLobby';

interface Props {
  date: string;
}

const ContentLobbyPage: FC<Props> = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const master = useAppSelector((state) => state.game.scrumMaster);

  const isScrumMuster = useAppSelector((state) => state.user.isScrumMaster);

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
          <h3 className="lobby-page-scrum-master-title"> Scrum Master:</h3>
          <Plate>
            <Avatar img={master?.img} fallbackText={master?.fallbackText} />
            <span>name:{master?.firstName}</span>
          </Plate>
        </div>
        {isScrumMuster ? <StartOrCancelGameInLobby /> : ''}
        <MembersInLobby />
        {isScrumMuster ? (
          <>
            <IssueComponent />
            <GameSettings />
          </>
        ) : (
          ''
        )}
        <CardsLobby />
      </div>

      <Chat />
    </div>
  );
};

export default ContentLobbyPage;

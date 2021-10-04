import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Avatar from '../../components/avatar/Avatar';
import Plate from '../../components/plate/Plate';
import './contentLobbyPage.scss';
import Chat from '../../components/Chat/Chat';
import MembersInLobby from '../../components/MembersInLobby/MembersInLobby';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import GameSettings from '../../components/gameSettings/GameSettings';
import IssueComponent from '../../components/Issue/IssueComponent';
import socket from '../../socket';
import { setScrumMusterData, setUsers } from '../../redux/game/gameReducer';
import StartOrCancelGameInLobby from '../../components/StartOrCancelGameInLobby/StartOrCancelGameInLobby';
import CardsLobby from '../../components/cardsLobby/CardsLobby';
import { log } from 'util';
import { getCurrentData } from '../../utils/utils';
import HeaderPlaningIssue from '../../components/HeaderPlaningIssue/HeaderPlaningIssue';

interface Props {
  date: string;
}

const ContentLobbyPage: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const master = useAppSelector((state) => state.game.scrumMaster);
  const isScrumMuster = useAppSelector((state) => state.user.isScrumMaster);
  const newUser = useAppSelector((state) => state.user);
  const issues = useAppSelector((state) => state.issie.issues);


  useEffect(() => {
    socket.on('show-ScrumMuster-Data', (user:any) => {
      dispatch(setScrumMusterData({ data: user }));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('get connected users', (users:any) => {
      dispatch(setUsers({ data: users }));
    });
    socket.on('get users after deleting', (users:any) => {
      dispatch(setUsers({ data: users }));
    });
  }, []);

  let  planingIssues=issues.map(iss=>iss.title)

  const currentData=getCurrentData();

  return (
    <div className="lobby-page-content">
      <div className="lobby-page-wrapper">
       <HeaderPlaningIssue/>
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
            <CardsLobby />
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

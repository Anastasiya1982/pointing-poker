import React, { useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

import ContentLobbyPage from '../contentLobbyPage/ContentLobbyPage';
import './lobbyPage.scss';
import socket from '../../socket';
import {
  setCards,
  setIsTimerNeeded,
  setStartGame,
  setTimeOfRound,
  setUsers,
} from '../../redux/game/gameReducer';
import { useAppSelector } from '../../redux/hooks';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setActiveIssue, setIssues } from '../../redux/issue/issueReducer';

const LobbyPage = () => {
  const isScrumMuster = useAppSelector((state) => state.user.isScrumMaster);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isScrumMuster) {
      socket.on('show active issue to all players', (activeIssue) => {
        dispatch(setActiveIssue({ data: activeIssue }));
      });

      socket.on('game start', (settings) => {
        dispatch(setCards(settings.cards));
        dispatch(setIsTimerNeeded(settings.isTimerNeeded));
        dispatch(setIssues({ data: settings.issues }));
        dispatch(setStartGame(true));
        dispatch(setTimeOfRound(settings.timeOfRound));
        history.push('/game');
      });
      socket.on('get users after deleting', (users) => {
        dispatch(setUsers({ data: users }));
      });
    }
  }, []);

  return (
    <div className="wrapper-lobby-page">
      <Header />
      <ContentLobbyPage date="data" />
      <Footer />
    </div>
  );
};

export default LobbyPage;

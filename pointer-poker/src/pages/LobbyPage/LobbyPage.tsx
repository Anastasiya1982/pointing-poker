import React, { useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';

import ContentLobbyPage from '../contentLobbyPage/ContentLobbyPage';
import './lobbyPage.scss';
import socket from '../../socket';
import { setStartGame } from '../../redux/game/gameReducer';
import { useAppSelector } from '../../redux/hooks';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const LobbyPage = () => {
  const isScrumMuster=useAppSelector((state) => state.user.isScrumMaster);
  const history=useHistory();
  const dispatch=useDispatch()


  useEffect(() => {
    if (!isScrumMuster) {
      socket.on('game start', (gameStart) => {
        dispatch(setStartGame(gameStart));
        history.push('/game');
      });
    }
  })
  return (
    <div className="wrapper-lobby-page">
      <Header />
      <ContentLobbyPage date="data" />
      <Footer />
    </div>
  );
};

export default LobbyPage;

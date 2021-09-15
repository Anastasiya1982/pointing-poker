import React from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ContentLobbyPage from '../contentLobbyPage/ContentLobbyPage';
import './lobbyPage.scss';

const LobbyPage = () => {
  return (
    <div className="wrapper-lobby-page">
      <Header />
      <ContentLobbyPage />
      <Footer />
    </div>
  );
};

export default LobbyPage;

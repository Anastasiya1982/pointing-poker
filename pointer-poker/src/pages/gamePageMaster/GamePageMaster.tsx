import React from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ContentGamePageMaster from '../contentGamePageMaster/ContentGamePageMaster';
import './gamePageMaster.scss';

const GamePageMaster = () => {
  return (
    <div className="wrapper-game-page-master">
      <Header />
      <ContentGamePageMaster />
      <Footer />
    </div>
  );
};

export default GamePageMaster;

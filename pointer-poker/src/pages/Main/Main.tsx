import React from 'react';
import ContentMainPage from '../../components/contentMainPage/ContentMainPage';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import './Main.scss';

const Main = () => {
  return <div className="wrapper-main_page">
    <Header />
    <ContentMainPage />
    <Footer />
  </div>
};

export default Main;
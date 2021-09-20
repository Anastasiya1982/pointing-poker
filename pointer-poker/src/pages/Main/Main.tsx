import React from 'react';
import ContentMainPage from '../contentMainPage/ContentMainPage';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import './Main.scss';

const Main = () => {
  return <div className="wrapper-main_page">
    <Header />
      <h3>  connection link <span> http://localhost:5000/lobby/MyRoom </span></h3>
    <ContentMainPage />
    <Footer />
  </div>
};

export default Main;

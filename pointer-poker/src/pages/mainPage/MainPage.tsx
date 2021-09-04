import React from 'react';
import ContentMainPage from '../../component/contentMainPage/ContentMainPage';
import Footer from '../../component/footer/Footer';
import Header from '../../component/header/Header';
import './mainPage.css';

const MainPage = () => {
  return <div className="wrapper-main_page">
    <Header />
    <ContentMainPage />
    <Footer />
  </div>
};

export default MainPage;

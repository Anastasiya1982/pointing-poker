import React from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ContentResultPage from '../contentResultPage/ContentResultPage';
import './resultPage.scss';

const ResultPage = () => {
  return (
    <div className="wrapper-result-page">
      <Header />
      <ContentResultPage />
      <Footer />
    </div>
  );
};

export default ResultPage;

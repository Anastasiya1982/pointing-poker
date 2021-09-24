import React from 'react';
import Button from '../../components/button/Button';
import './contentResultPage.scss';

const ContentResultPage = () => {

  return (
    <div className="wrapper-contentResult-page">
      <div className="heder-result">
        <div className="date">Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)</div>
        <div className="btn-download">
          <Button TypeBtn={'filled'} label={'download result'}/>
        </div>
      </div>
      <div className="wrapper-issue"></div>
    </div>
  );
};

export default ContentResultPage;

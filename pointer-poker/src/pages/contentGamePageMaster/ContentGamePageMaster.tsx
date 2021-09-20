import React from 'react';
import Button from '../../components/button/Button';
import Plate from '../../components/plate/Plate';
import Timer from '../../components/timer/Timer';
import './contentGamePageMaster.scss';

const ContentGamePageMaster = () => {
  return (
    <div className="wrapper-content-PM">
      <div className="content-PM">
        <div className="header-content">
          <div className="date">Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)</div>
          <div className="wrapper-panel">
            <div className="scram-master">
              <div>Scram master:</div>
              <Plate children={undefined} />
            </div>
            <Button TypeBtn="unfilled" label="Stop Game" />
          </div>
        </div>
        <div className="wrapper-issues">
          <Timer roundTime={0} />
        </div>
      </div>
      <div className="vl" />
      <div className="wrapper-score">
        <div className="score">Score:</div>
        <div className="players">Players:</div>
      </div>
    </div>
  );
};

export default ContentGamePageMaster;

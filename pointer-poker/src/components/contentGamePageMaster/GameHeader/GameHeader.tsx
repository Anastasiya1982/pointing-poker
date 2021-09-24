import React from 'react';
import Plate from '../../plate/Plate';
import Button from '../../button/Button';
import '../contentGamePageMaster.scss';
import Avatar from '../../avatar/Avatar';
import { useAppSelector } from '../../../redux/hooks';

const GameHeader = () => {
  const master = useAppSelector((state) => state.game.scrumMaster);
  return (
    <div className="header-content">
      <div className="date">Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)</div>
      <div className="wrapper-panel">
        <div className="scram-master">
          <div>Scram master:</div>
          <Plate  >
            <Avatar img={master?.img} fallbackText={master?.fallbackText} />
            <span>name:{master?.firstName}</span>
          </Plate>
        </div>
        <Button TypeBtn="unfilled" label="Stop Game" />
      </div>
    </div>
  );
};
export default GameHeader;

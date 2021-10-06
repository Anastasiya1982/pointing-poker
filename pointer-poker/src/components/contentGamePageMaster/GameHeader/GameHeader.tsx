import React from 'react';
import Plate from '../../plate/Plate';
import Button from '../../button/Button';
import '../contentGamePageMaster.scss';
import Avatar from '../../avatar/Avatar';
import { useAppSelector } from '../../../redux/hooks';
import { useHistory } from 'react-router';
import HeaderPlaningIssue from '../../HeaderPlaningIssue/HeaderPlaningIssue';
import socket from '../../../socket';

const GameHeader = () => {
  const issues = useAppSelector((state) => state.issie.issues);
  const history=useHistory();

  const onHandlerStopGameAndGotoResults=()=>{
    socket.emit("stop game and show results table",(issues))
    history.push('/results')
  }
  const master = useAppSelector((state) => state.game.scrumMaster);
  return (
    <div className="header-content">
      <HeaderPlaningIssue/>
      <div className="wrapper-panel">
        <div className="scram-master">
          <div>Scram master:</div>
          <Plate  >
            <Avatar img={master?.img} fallbackText={master?.fallbackText} />
            <span>name:{master?.firstName}</span>
          </Plate>
        </div>
        <div className="btn-stop-wrapper">
        <Button TypeBtn="filled" label="Stop Game" onClick={onHandlerStopGameAndGotoResults}/>
        </div>

        
      </div>
    </div>
  );
};
export default GameHeader;

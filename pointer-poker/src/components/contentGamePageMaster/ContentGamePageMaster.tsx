import React, { useEffect } from 'react';
import Plate from '../plate/Plate';
import Timer from '../timer/Timer';
import './contentGamePageMaster.scss';
import { useAppSelector } from '../../redux/hooks';
import GameHeader from './GameHeader/GameHeader';
import socket from '../../socket';
import TeamScoreInGame from '../TeamScoreInGame/TeamScoreInGame';
import CardsInGame from './CardsInGame/CardsInGame';
import { setCards, setIsTimerNeeded } from '../../redux/game/gameReducer';
import { useDispatch } from 'react-redux';
import { setIssues } from '../../redux/issue/issueReducer';

const ContentGamePageMaster=() => {
  const issues=useAppSelector((state) => state.issie.issues);
  const activeIssue=useAppSelector((state) => state.issie.activeIssue);
  const isScrumMuster=useAppSelector((state) => state.user.isScrumMaster);
  const dispatch=useDispatch();

  useEffect(() => {
    socket.on('game start', (settings) => {
      console.log(settings);
      dispatch(setCards(settings.cards));
      dispatch(setIsTimerNeeded(settings.isTimerNeeded));
      dispatch(setIssues({data:settings.issues}))
    });
  }, []);


  const deleteIssue=(index: any) => {
    const currentIssue=issues[index];
    socket.emit('delete issue', currentIssue);
  };

  return (
    <div className="wrapper-content-PM">
      <div className="content-PM">
        <GameHeader/>
        <div className="wrapper-issues-container">
          <div className="issue-box">
            {issues.map((issue, index) => {
              return (
                <Plate key={index}>
                  <div
                    className={
                      issue.title === activeIssue?.title ? 'selectedIssue' : 'newIssues-content'
                    }
                  >
                    <div className="newIssues-title">{issue.title}</div>
                    <button
                      className="issue-btn"
                      onClick={() => {
                        deleteIssue(index);
                      }}
                    >
                      X
                    </button>
                  </div>
                </Plate>
              );
            })}
          </div>
          <Timer roundTime={0}/>
        </div>
        {isScrumMuster ? <div>Statistics</div>
          : <CardsInGame/>
        }
      </div>
      <TeamScoreInGame/>
    </div>
  );
};

export default ContentGamePageMaster;

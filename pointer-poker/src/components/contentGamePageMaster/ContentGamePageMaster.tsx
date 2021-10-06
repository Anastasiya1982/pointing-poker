import React, { useEffect, useState } from 'react';
import Plate from '../plate/Plate';
import Timer from '../timer/Timer';
import './contentGamePageMaster.scss';
import { useAppSelector } from '../../redux/hooks';
import GameHeader from './GameHeader/GameHeader';
import socket from '../../socket';
import TeamScoreInGame from '../TeamScoreInGame/TeamScoreInGame';
import CardsInGame from './CardsInGame/CardsInGame';
import { useDispatch } from 'react-redux';
import Statistic from '../StatisticOnMasterPage/Statistic';
import Button from '../button/Button';
import { setActiveIssue } from '../../redux/issue/issueReducer';
import {
  setIsTimerStart,
  setSelectedCard,
  setStartIssueRound,
  setTimeOfRound,
  setUsers,
  setStopIssueRound,
} from '../../redux/game/gameReducer';

import { useHistory } from 'react-router';

const ContentGamePageMaster = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const issues = useAppSelector((state) => state.issie.issues);
  const activeIssue = useAppSelector((state) => state.issie.activeIssue);
  const isScrumMuster = useAppSelector((state) => state.user.isScrumMaster);
  const isScrumMusterAPlayer = useAppSelector((state) => state.game.isScrumMasterAPlayer);
  const isRoundStop = useAppSelector((state) => state.game.stopIssueRound);
  const isRoundStart = useAppSelector((state) => state.game.startIssueRound);
  const timeOfRound = useAppSelector((state) => state.game.timeOfRound);
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteIssue = (index: any) => {
    const currentIssue = issues[index];
    socket.emit('delete issue', currentIssue);
  };


  useEffect(() => {
    socket.on('started new issue round', (data) => {
      dispatch(setStartIssueRound(data));
      dispatch(setTimeOfRound(timeOfRound));
    });
    dispatch(setIsTimerStart({ value: true }));
  }, [isRoundStart]);

  useEffect(() => {
    socket.on('stop round', (data) => {
      console.log(data);
      dispatch(setIsTimerStart({ value: false }));
      dispatch(setStartIssueRound(false));
      dispatch(setStopIssueRound(data.isRoundStop));
      dispatch(setSelectedCard(null));
      dispatch(setUsers({ data: data.users }));
    });
  }, [isRoundStop]);

  const setNextIssueAsActive = () => {
    const searchName = activeIssue?.title;
    const index = issues.findIndex((el) => el.title === searchName);
    const nextIssue = issues[index + 1];
    dispatch(setStartIssueRound(false));
    dispatch(setStopIssueRound(false));
    socket.emit('set active issue', nextIssue);
    dispatch(setActiveIssue({ data: nextIssue }));
    dispatch(setSelectedCard(null));
  };

  return (
    <div className="wrapper-content-PM">
      <div className="content-PM">
        <GameHeader />
        <div className="wrapper-content-game-page">
          <div className="wrapper-issues-container">
            <div className="issue-box">
              {issues.map((issue: any, index: number) => {
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
            <div className="btn-next-wrapper">
              {isScrumMuster ? (
                <Button
                  TypeBtn="filled"
                  label="nextIssue"
                  onClick={setNextIssueAsActive}
                  disabled={isDisabled}
                />
              ) : null}
            </div>
          </div>
          <Timer />
        </div>

        {!isScrumMuster ? (
          <CardsInGame />
        ) : (
          <div>{isScrumMusterAPlayer ? <CardsInGame /> : ''}</div>
        )}
        {isRoundStop ? <Statistic /> : null}
      </div>
      <TeamScoreInGame />
    </div>
  );
};

export default ContentGamePageMaster;

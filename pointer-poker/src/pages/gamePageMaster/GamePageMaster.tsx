import React, { useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ContentGamePageMaster from '../../components/contentGamePageMaster/ContentGamePageMaster';
import './gamePageMaster.scss';
import socket from '../../socket';
import { useAppSelector } from '../../redux/hooks';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  setCards,
  setIsTimerNeeded,
  setIsTimerStart,
  setSelectedCard,
  setStartGame,
  setStartIssueRound,
  setStopIssueRound,
  setTimeOfRound,
  setUsers,
} from '../../redux/game/gameReducer';
import { setActiveIssue, setIssues } from '../../redux/issue/issueReducer';
import { setVoite } from '../../redux/user/userReducer';

const GamePageMaster = () => {
  const isScrumMuster = useAppSelector((state) => state.user.isScrumMaster);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('Show results for all players', (data: any) => {
      dispatch(setUsers({ data: data.users }));
      dispatch(setIssues({ data: data.issues }));
    });
  }, []);

  useEffect(() => {
    if (!isScrumMuster) {
      socket.on('started new issue round', (data) => {
        dispatch(setStartIssueRound(true));
        dispatch(setIsTimerStart({ value: true }));
        dispatch(setSelectedCard(null));
      });

      socket.on('stop round', (data) => {
        dispatch(setStartIssueRound(false));
        dispatch(setStopIssueRound(data.isRoundStop));
        dispatch(setIsTimerStart({ value: false }));

        dispatch(setUsers({ data: data.users }));
      });

      socket.on('show results Page to player', (data) => {
        dispatch(setIssues({ data: data }));
        history.push('/results');
      });

      socket.on('reset voite for all users', (data) => {});
    }
  }, []);

  return (
    <div className="wrapper-game-page-master">
      <Header />
      <ContentGamePageMaster />
      <Footer />
    </div>
  );
};

export default GamePageMaster;

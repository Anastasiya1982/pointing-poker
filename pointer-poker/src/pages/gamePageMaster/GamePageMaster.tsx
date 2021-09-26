import React, { useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import ContentGamePageMaster from '../../components/contentGamePageMaster/ContentGamePageMaster';
import './gamePageMaster.scss';
import socket from '../../socket';
import { useAppSelector } from '../../redux/hooks';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setVoite } from '../../redux/user/userReducer';
import { setUsers } from '../../redux/game/gameReducer';

const GamePageMaster = () => {
  const isScrumMuster=useAppSelector((state) => state.user.isScrumMaster);

  const history=useHistory();
  const dispatch=useDispatch();

  useEffect(()=>{
      socket.on("Show results for all players",(data:any)=>{
        console.log(data.users)
        dispatch(setUsers({data:data.users}))
      })
  },[])


  return (
    <div className="wrapper-game-page-master">
      <Header />
      <ContentGamePageMaster />
      <Footer />
    </div>
  );
};

export default GamePageMaster;

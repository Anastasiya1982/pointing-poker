
import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Avatar from '../../components/avatar/Avatar';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Plate from '../../components/plate/Plate';
import './contentLobbyPage.scss';
// eslint-disable-next-line import/order
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalView from '../modalView/ModalView';
import SelectModal from '../../components/selectModal/SelectModal';
import Chat from '../../components/Chat/Chat';
import MembersInLobby from '../../components/MembersInLobby/MembersInLobby';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import GameSettings from '../../components/gameSettings/GameSettings';
import IssueComponent from '../../components/Issue/Issue';
import socket from '../../socket';
import { setScrumMusterData } from '../../redux/game/gameReducer';
import StartOrCancelGameInLobby from '../../components/StartOrCancelGameInLobby/StartOrCancelGameInLobby';

interface Props {
  date: string;
}

const ContentLobbyPage: FC<Props> = () => {
  const [modalActive, setModalActive] = useState(false);
  const user = useAppSelector((state) => state.user);
  const dispatch=useAppDispatch();
  const master=useAppSelector((state) => state.game.scrumMaster);

  const openModalAddIssues = useCallback(() => {
    setModalActive(true);
  }, []);
  const isScrumMuster=useAppSelector((state) => state.user.isScrumMaster);

  //TODO: отображать скрам мастера у всех эзеров при входе в лобби
 // useEffect(()=>{
 //   if(isScrumMuster){
 //    socket.emit("show-user-scrumMuster",user)
 // }
 //  },[isScrumMuster]);
 //
  useEffect(()=>{
    socket.on("show-ScrumMuster-Data",(user)=>{
      dispatch(setScrumMusterData({data:user}))
    })
  },[user]);
  console.log(master);
  return (
    <div className="lobby-page-content">
      <div className="lobby-page-wrapper">
        <div className="date">Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)</div>
        <div className="lobby-page-scrum-master">
          <h3 className="lobby-page-scrum-master-title"> Scrum Master:</h3>
          <Plate>
            <Avatar img={master?.img} fallbackText={master?.fallbackText}/>
            <span>name:{master?.firstName}</span>
          </Plate>
        </div>
        {isScrumMuster ? (
          <StartOrCancelGameInLobby/>
        ) : ''}
        <MembersInLobby/>
        {isScrumMuster ? (
          <>
            <IssueComponent openModalAddIssues={openModalAddIssues}/>
            <GameSettings/>
            <ModalView active={modalActive} setActive={setModalActive}>
              <div className="header-modal-lobby-addIssues">Create Issue</div>
              <div className="content-modal-lobby-addIssues">
                <div className="wrapper-content-modal-lobby-addIssues">
                  <span>Title:</span>
                  <Input onChange={() => {
                    console.log('USSUES TITLE');
                  }}/>
                </div>
                <div className="wrapper-content-modal-lobby-addIssues">
                  <span>Link:</span>
                  <Input onChange={() => {
                    console.log('link');
                  }}/>
                </div>
                <div className="wrapper-content-modal-lobby-addIssues">
                  <span>Priority:</span>
                  <SelectModal onChange={() => {
                    console.log('is modal open');
                  }} value="value"/>
                </div>
              </div>
              <div className="footer-modal-lobby-addIssues">
                <Button label={'Yes'} TypeBtn={'filled'} onClick={() => console.log('Confirm')}/>
                <Button label={'No'} TypeBtn={'unfilled'} onClick={() => setModalActive(false)}/>
              </div>
            </ModalView>
          </>
        ) : ''
        }
      </div>
      <Chat/>
    </div>
  );
};

export default ContentLobbyPage;

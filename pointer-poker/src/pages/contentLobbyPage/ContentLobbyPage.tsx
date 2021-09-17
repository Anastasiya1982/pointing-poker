import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import Avatar from '../../components/avatar/Avatar';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Plate from '../../components/plate/Plate';
import './contentLobbyPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faDivide } from '@fortawesome/free-solid-svg-icons';
import ModalView from '../modalView/ModalView';
import SelectModal from '../../components/selectModal/SelectModal';
import BtnSwitch from '../../components/btnSwitch/BtnSwitch';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setIsScrumMasterAPlayer,
  setIsTimerNeeded,
  setScoreType,
} from '../../redux/game/gameReducer';
import Countdown from '../../components/timer/Timer';

interface Props {
  date: string;
}

const ContentLobbyPage: FC<Props> = ({ date }) => {
  const dispatch = useAppDispatch();

  const [modalActive, setModalActive] = useState(false);

  const openModalAddIssues = useCallback(() => {
    setModalActive(true);
  }, []);
  const isTimerTrue = useAppSelector((state) => state.game.isTimerNeeded);
  const [isMasterAPlayer, setIsMasterAPlayer] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const score = useAppSelector((state) => state.game.scoreType);

  const value = score === 'story point' ? 'SP' : '%';

  const isMasterPlayer = () => {
    setIsMasterAPlayer(!isMasterAPlayer);
    if (!isMasterAPlayer) {
      dispatch(setIsScrumMasterAPlayer(true));
    } else {
      dispatch(setIsScrumMasterAPlayer(false));
    }
  };

  const isTimeNeeded = () => {
    setIsTimer(!isTimer);
    if (!isTimer) {
      dispatch(setIsTimerNeeded(true));
    } else {
      dispatch(setIsTimerNeeded(false));
    }
  };

  const changeInputScoreType = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setScoreType({ value: event.currentTarget.value }));
  };

  return (
    <div className="lobby-page-wrapper">
      <div className="date">{date}</div>
      <div className="lobby-page-scrum-master">
        <div className="lobby-page-scrum-master-title"> Scrum Master:</div>
        <Plate>
          <Avatar />
        </Plate>
      </div>
      <div className="lobby-page-entry">
        <p className="lobby-page-entry-title">Link to lobby:</p>
        <Input className={'lobby-page-input'} />
        <Button
          label={'Copy'}
          TypeBtn={'filled'}
          onClick={() => console.log('click')}
          className={'lobby-page-button-copy'}
        />
      </div>
      <div className="lobby-page-button-container">
        {' '}
        <Button
          label={'Start Game'}
          TypeBtn={'filled'}
          onClick={() => console.log('click')}
          className={'lobby-page-button-star-game'}
        />
        <Button
          label={'Cancel Game'}
          TypeBtn={'unfilled'}
          onClick={() => console.log('click')}
          className={'lobby-page-button-cancel-game'}
        />
      </div>
      <div className="lobby-page-button-members">
        <p className="lobby-page-button-members-title">Members:</p>
      </div>
      <div className="lobby-page-issues-container">
        <div className="lobby-page-issues-title">Issues:</div>
        <div className="lobby-page-issues-plate">
          <Plate>
            <div className="lobby-page-issues-plate-title">Crete new issues</div>
            <button className="btn-add-issues" onClick={openModalAddIssues}>
              <FontAwesomeIcon className="lobby-page-icon" icon={faPlus} />
            </button>
          </Plate>
        </div>
      </div>
      <div className="lobby-page-game-settings">
        <div className="lobby-page-game-settings-title">Game settings</div>
        <div className="lobby-page-game-settings-container">
          <div>Scram master as player:</div>
          <BtnSwitch id="isMasterAPlayer" checked={isMasterAPlayer} onChange={isMasterPlayer} />
        </div>
        <div className="lobby-page-game-settings-container">
          <div> Is timer needed:</div>
          <BtnSwitch id="isTimer" checked={isTimer} onChange={isTimeNeeded} />
        </div>

        <div className="lobby-page-game-settings-container-input">
          <div>Score type:</div>
          <label className="lobby-page-game-settings-label" htmlFor="settings">
            <select
              className="lobby-page-game-settings-select"
              name="settings"
              onChange={changeInputScoreType}
            >
              <option defaultValue="story point">story point</option>
              <option value="percent">percent</option>
            </select>
          </label>
        </div>

        <div className="lobby-page-game-settings-container-input">
          <div>Score type (Short):</div>

          <p className="lobby-page-game-settings-short">{value}</p>
        </div>

        <div className="lobby-page-game-settings-round-time-container">
          <div>Round Time:</div>
          {isTimerTrue ? <Countdown /> : null}
        </div>
      </div>
      <ModalView active={modalActive} setActive={setModalActive}>
        <div className="header-modal-lobby-addIssues">Create Issue</div>
        <div className="content-modal-lobby-addIssues">
          <div className="wrapper-content-modal-lobby-addIssues">
            <span>Title:</span>
            <Input />
          </div>
          <div className="wrapper-content-modal-lobby-addIssues">
            <span>Link:</span>
            <Input />
          </div>
          <div className="wrapper-content-modal-lobby-addIssues">
            <span>Priority:</span>
            <SelectModal />
          </div>
        </div>
        <div className="footer-modal-lobby-addIssues">
          <Button label={'Yes'} TypeBtn={'filled'} onClick={() => console.log('Confirm')} />
          <Button label={'No'} TypeBtn={'unfilled'} onClick={() => setModalActive(false)} />
        </div>
      </ModalView>
    </div>
  );
};

export default ContentLobbyPage;

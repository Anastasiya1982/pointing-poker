/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as uuid from 'uuid';
import Plate from '../plate/Plate';
import './Issue.scss';
import ModalView from '../../pages/modalView/ModalView';
import CreteIssueComponent from '../createIssueComponent/createIssueComponent';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import socket from '../../socket';
import { setActiveIssue, setIssues } from '../../redux/issue/issueReducer';
import cart from '../../assets/deleteVector.png';

const IssueComponent = () => {
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const issues = useAppSelector((state) => state.issie.issues);
  const activeIssue = useAppSelector((state) => state.issie.activeIssue);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    socket.on('get created issues', (issues: any) => {
      dispatch(setIssues({ data: issues }));
    });
    // eslint-disable-next-line @typescript-eslint/no-shadow
    socket.on('get Issues after deleting', (issues: any) => {
      dispatch(setIssues({ data: issues }));
    });
  }, [issues, dispatch]);

  const openModalAddIssues = useCallback(() => {
    setModalActive(true);
  }, []);

  const handleIssueClick = (index: number) => {
    const currentIssue = issues[index];
    dispatch(setActiveIssue({ data: currentIssue }));
    socket.emit('set active issue', currentIssue);
  };

  const deleteIssue = (index: any) => {
    const currentIssue = issues[index];
    socket.emit('delete issue', currentIssue);
  };
  return (
    <>
      <div className="lobby-page-issues-container">
        <h4 className="lobby-page-issues-title">Issues:</h4>
        <div className="flex-container-for-issues">
          <div className="lobby-page-issues-plate">
            <Plate>
              <div className="lobby-page-issues-plate-title">Crete new issues</div>
              <button className="btn-add-issues" onClick={openModalAddIssues} type="button">
                <FontAwesomeIcon className="lobby-page-icon" icon={faPlus} />
              </button>
            </Plate>
          </div>
          <div className="newIssues">
            {issues.map((issue, index) => {
              return (
                <Plate key={uuid.v4()}>
                  <div
                    aria-hidden="true"
                    onClick={() => handleIssueClick(index)}
                    className={
                      issue.title === activeIssue?.title ? 'selectedIssue' : 'newIssues-content'
                    }
                  >
                    <div className="newIssues-title">{issue.title}</div>
                    <button
                      type="button"
                      className="issue-btn"
                      onClick={() => {
                        deleteIssue(index);
                      }}
                    >
                      <img className="issue-delete-icon" src={cart} alt={cart} />
                    </button>
                  </div>
                </Plate>
              );
            })}
          </div>
        </div>
      </div>
      <ModalView active={modalActive} setActive={setModalActive}>
        <CreteIssueComponent setModalActive={setModalActive} />
      </ModalView>
    </>
  );
};
export default IssueComponent;

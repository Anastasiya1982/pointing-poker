import React, { ChangeEvent, FC, useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import socket from '../../socket';
import { setIssue } from '../../redux/issue/issueReducer';

interface PropsIssueType {
  setModalActive: (modalActive: boolean) => void;
}

const CreteIssueComponent: FC<PropsIssueType> = ({ setModalActive }) => {
  const [priority, setPriority] = useState('');
  const [value,setValue]=useState('')
  const dispatch = useAppDispatch();
  const issues = useAppSelector((state) => state.issie.issues);
  const issue = useAppSelector((state) => state.issie.issue);

  const onHandleIssueTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setIssue({ title:event.target.value}));
  };

  const onHandlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPriority(event.currentTarget.value);
  };

  const onHandleIssueSubmit = () => {
    socket.emit('create-new-issue', issue);
    setModalActive(false);
  };

  return (
    <div>
      <div className="header-modal-lobby-addIssues">Create Issue</div>
      <div className="content-modal-lobby-addIssues">
        <div className="wrapper-content-modal-lobby-addIssues">
          <span>Title:</span>
          <Input onChange={onHandleIssueTitleChange} placeholder="title"/>
        </div>
        <div className="wrapper-content-modal-lobby-addIssues">
          <span>Priority:</span>
          <div>
            <label className="label-select-modal" htmlFor="priority">
              <select className="select-modal" name="priority" onChange={onHandlePriorityChange}>
                <option value="Low">Low</option>
                <option value="Middle">Middle</option>
                <option value="Hight"> Hight</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="footer-modal-lobby-addIssues">
        <Button label="Yes" TypeBtn="filled" onClick={onHandleIssueSubmit} />
        <Button label="No" TypeBtn="unfilled" onClick={() => setModalActive(false)} />
      </div>
    </div>
  );
};
export default CreteIssueComponent;

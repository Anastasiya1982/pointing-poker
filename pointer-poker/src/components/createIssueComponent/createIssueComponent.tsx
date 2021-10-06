import React, { ChangeEvent, FC, useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { useAppDispatch } from '../../redux/hooks';
import socket from '../../socket';
import { setIssue } from '../../redux/issue/issueReducer';

interface PropsIssueType {
  setModalActive: (modalActive: boolean) => void;
}

const CreteIssueComponent: FC<PropsIssueType> = ({ setModalActive }) => {
  const [priority, setPriority] = useState('');
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const onHandleIssueTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onHandlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPriority(event.currentTarget.value);
  };

  const onHandleIssueSubmit = () => {
    dispatch(setIssue(value));
    const newIssue = { title: value, priority, results: null };
    socket.emit('create-new-issue', newIssue);
    setValue('');

    setModalActive(false);
  };

  return (
    <div>
      <div className="header-modal-lobby-addIssues">Create Issue</div>
      <div className="content-modal-lobby-addIssues">
        <div className="wrapper-content-modal-lobby-addIssues">
          <span>Title:</span>
          <Input onChange={onHandleIssueTitleChange} placeholder="title" value={value} />
        </div>
        <div className="wrapper-content-modal-lobby-addIssues">
          <span>Priority:</span>
          <div>
            <label className="label-select-modal" htmlFor="priority">
              <select className="select-modal" name="priority" onBlur={onHandlePriorityChange}>
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

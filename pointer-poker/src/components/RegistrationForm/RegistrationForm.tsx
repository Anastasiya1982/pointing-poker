import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../input/Input';
import Avatar from '../avatar/Avatar';
import './registrationForm.scss';
import { setUser } from '../../redux/user/userReducer';
import Button from '../button/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import socket from '../../socket';
import { getFallbackText } from '../../utils/utils';

const RegistrationForm = (props: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [img, setImage] = useState('');
  const [connected, setConnected] = useState(false);
  const dispatch = useAppDispatch();
  const newUser = useAppSelector((state) => state.user);
  const [userNameError, setUserNameError] = useState('The field cannot be empty');
  const [formValid, setFormValid] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (connected) {
      socket.emit('handle-connection', newUser);
      history.push('/lobby');
    }
    if (userNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [connected, userNameError, history, newUser]);

  const changeUserFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.currentTarget.value);
    const re = /^[a-zA-Z ]+$/;
    if (!re.test(String(event.currentTarget.value).toLowerCase())) {
      setUserNameError('Invalid name');
    } else {
      setUserNameError('');
    }
  };
  const changeUserLastName = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.currentTarget.value);
  };
  const changePosition = (event: ChangeEvent<HTMLInputElement>) => {
    setJobPosition(event.target.value);
  };
  const closeModal = () => {
    props.setModalIsActive(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const avat = getFallbackText(firstName, lastName);
    const isMaster = props.typeOfUser !== 'player';
    dispatch(
      setUser({
        firstName,
        lastName,
        jobPosition,
        id: socket.id,
        isScrumMaster: isMaster,
        img,
        type: 'player',
        fallbackText: avat,
      }),
    );
    setConnected(true);
  };

  const onSetUserPhotoToAvatar = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-shadow
      reader.onload = (event: any) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <form className="content-form">
        <label htmlFor="firstName">Your first name:</label>
        <div className="input-name">
          {userNameError && <div style={{ color: 'red' }}>{userNameError}</div>}
          <Input
            className="input-modal"
            onChange={changeUserFirstName}
            value={firstName}
            id="firstName"
          />
        </div>
        <label htmlFor="firstName1">Your last name:</label>
        <Input
          id="firstName1"
          className="input-modal"
          onChange={changeUserLastName}
          value={lastName}
        />
        <label htmlFor="firstName2">Your job position:</label>
        <Input
          id="firstName2"
          className="input-modal"
          onChange={changePosition}
          value={jobPosition}
        />
        <div>
          <label htmlFor="btnInput">Image:</label>
          <input
            className="custom-file-input"
            id="btnInput"
            name="upload"
            type="file"
            onChange={onSetUserPhotoToAvatar}
          />
        </div>
        <div className="image-container" id="img-reset">
          <Avatar img={img} fallbackText={newUser.fallbackText} className="avatarReal" />
        </div>
        <div className="wrapper-footer">
          <Button label="Confirm" TypeBtn="filled" onClick={handleSubmit} disabled={!formValid} />
          <Button label="Cancel" TypeBtn="unfilled" onClick={closeModal} />
        </div>
      </form>
    </div>
  );
};
export default RegistrationForm;

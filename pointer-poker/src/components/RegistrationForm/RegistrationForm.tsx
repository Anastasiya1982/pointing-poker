import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../input/Input';
import Avatar from '../avatar/Avatar';
import './registrationForm.scss';
import { setFirstName, setId, setJobPosition, setLastName } from '../../redux/user/userReducer';

import Button from '../button/Button';
// eslint-disable-next-line import/order
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { setUsers } from '../../redux/game/gameReducer';
import socket from '../../socket';

const RegistrationForm = (props: any) => {
  const [userName, setUserName] = useState('');
  const [lastName, setUserLastName] = useState('');
  const [position, setPosition] = useState('');
  const [img, setImg] = useState('');
  const dispatch = useDispatch();
  const newUser= useAppSelector((state) => state.user);

   const history = useHistory();
  const generateRandomId=()=>{
    const id=Math.floor(Math.random() *100);
    return id;
  };
  const changeUserFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.currentTarget.value);
  };
  const changeUserLastName = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    setUserLastName(event.currentTarget.value);
  };
  const changePosition = (event: ChangeEvent<HTMLInputElement>) => {
    setPosition(event.target.value);
  };
  const closeModal = () => {
    props.setModalIsActive(false);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setFirstName({ value: userName }));
    setUserName('');
    dispatch(setLastName({ value: lastName }));
    dispatch(setId({value:generateRandomId()}));
    setUserLastName('');
    dispatch(setJobPosition({ value: position }));
    setPosition('');
    history.push('/lobby');
  };


  //dispatch (setUsers({value:user}));


  const onSetUserPhotoToAvatar = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setImg(event.target.result);
        console.log(img);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <form className="content-form">
        <label>Your first name:</label>
        <Input className="input-modal" onChange={changeUserFirstName} value={userName} />
        <label>Your last name:</label>
        <Input className="input-modal" onChange={changeUserLastName} value={lastName} />
        <label>Your job position:</label>
        <Input className="input-modal" onChange={changePosition} value={position} />
      </form>
      <div>
        <label>Image:</label>
        <input
          className="custom-file-input"
          id="btnInput"
          name="upload"
          type="file"
          onChange={onSetUserPhotoToAvatar}
        />
      </div>

      <div className="image-container" id="img-reset">
        <Avatar img={img} fallbackText="someText" className="avatarReal" />
      </div>
      <div className="wrapper-footer">
        <Button label="Confirm" TypeBtn="filled" onClick={handleSubmit} />
        <Button label="Cancel" TypeBtn="unfilled" onClick={closeModal} />
      </div>
    </div>
  );
};
export default RegistrationForm;

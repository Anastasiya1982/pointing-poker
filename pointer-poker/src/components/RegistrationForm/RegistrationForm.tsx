import React, { ChangeEvent, useEffect, useState } from 'react';
import Input from '../input/Input';
import Avatar from '../avatar/Avatar';
import './registrationForm.scss';
import {
  setFirstName,
  setJobPosition,
  setLastName,
  setImg,
  setUser,
} from '../../redux/user/userReducer';

import Button from '../button/Button';

import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import socket from '../../socket';



const RegistrationForm = (props: any) => {
  const [img, setImage] = useState(null);
  const dispatch = useAppDispatch();
  const newUser = useAppSelector((state) => state.user);

  const history = useHistory();
  const generateRandomId = () => {
    const id = Math.floor(Math.random() * 100);
    return id;
  };
  const changeUserFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstName({ value: event.currentTarget.value }));
  };
  const changeUserLastName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastName({ value: event.currentTarget.value }));
  };
  const changePosition = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setJobPosition({ value: event.target.value }));
  };
  const closeModal = () => {
    props.setModalIsActive(false);
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setUser({
                            firstName: newUser.firstName,
                            lastName:newUser.lastName,
                            jobPosition:newUser.jobPosition,
                            id:generateRandomId(),
                            isScrumMaster:true,
                            img:img,
                               type:'player'

    }));

    socket.emit('USER:JOIN ROOM', newUser);
    console.log('новый пользователь присоединился ', newUser)
    history.push('/lobby');
  };
  const onSetUserPhotoToAvatar=(event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader=new FileReader();
      reader.onload=(event: any) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <form className="content-form">
        <label>Your first name:</label>
        <Input className="input-modal" onChange={changeUserFirstName} value ={newUser.firstName} />
        <label>Your last name:</label>
        <Input className="input-modal" onChange={changeUserLastName} value ={newUser.lastName} />
        <label>Your job position:</label>
        <Input className="input-modal" onChange={changePosition} value ={newUser.jobPosition} />
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

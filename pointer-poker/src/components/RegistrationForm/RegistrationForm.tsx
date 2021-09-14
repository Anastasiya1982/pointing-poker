import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../input/Input';
import Avatar from '../avatar/Avatar';
import './registrationForm.scss';
// import { setFirstName, setJobPosition, setLastName, setAvatar } from '../../redux/user/userReducer';

import Button from '../button/Button';

const RegistrationForm = (props: any) => {
  const [userName, setUserName] = useState('');
  const [lastName, setUserLastName] = useState('');
  const [position, setPosition] = useState('');
  const [img, setImg] = useState('');
  const dispatch = useDispatch();

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
  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   dispatch(setFirstName({ value: userName }));
  //   setUserName('')
  //   dispatch(setLastName({ value: lastName }));
  //   setUserLastName("")
  //   dispatch(setJobPosition({ value: position }));
  //   setPosition('')
  //   dispatch(setAvatar({ value: img }));
  //   console.log('form is submit');
  // };

  const onSetUserPhotoToAvatar = (event: any) => {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setImg(event.target.result);
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
        <Button label="Confirm" TypeBtn="filled" onClick={()=>console.log('Confirm')} />
        <Button label="Cancel" TypeBtn="unfilled" onClick={closeModal} />
      </div>
    </div>
  );
};
export default RegistrationForm;

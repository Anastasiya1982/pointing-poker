import React, { useCallback, useState } from 'react'
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import ModalView from '../modalView/ModalView';
import './contentMainPage.scss';
import BtnSwitch from './../../components/btnSwitch/BtnSwitch';
import Avatar from '../../components/avatar/Avatar';


const ContentMainPage = () => {

  const [modalActive, setModalActive] = useState(false);

  const openModalStartGame = useCallback(
    () => {
      setModalActive(true);
    },
    [],
  );

  // загрузка аватара
  const fileInput = document.querySelector('input[type="file"]');
  const imageContainer = document.querySelector('.image-container');
  let myImg = document.getElementById('img') as HTMLImageElement

  fileInput?.addEventListener('change', function (e) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      myImg.src = reader.result;
    }
    reader.readAsDataURL(file);
  });

  return (
    <div className="wrapper-content">
      <img className="pp-img" src="../../assets/Group.svg" alt="pp_logo" />
      <div className="wrapper-start_game">
        <h2 className="h2-main_page">Start your planning:</h2>
        <span>Create session:</span>
        <Button
          label={'Start new game'}
          TypeBtn={'filled'}
          onClick={openModalStartGame}
        />
      </div>
      <div className="wrapper-connect">
        <h2 className="h2-main_page">OR:</h2>
        <p>Connect to lobby by URL:</p>
        <Input
        // value={value}
        // onChange={onChange}
        />

        <Button
          label={'Connect'}
          TypeBtn={'filled'}
          onClick={() => console.log('click')}
        />

        <ModalView active={modalActive} setActive={setModalActive}>
          <div className="wrapper-modal">
            <div className="wrapper-header">
              <div className="name-modal">Connect to lobby</div>
              <div className="name-button">Connect as Observer</div>
              <div className="wrapper-button">
                <BtnSwitch callback={function (): void { }} />
              </div>
            </div>
            <div className="wrapper-form">
              <form className="content-form">
                <label>Your first name:</label>
                <Input
                  className={'input-modal'}
                />
                <label>Your last name:</label>
                <Input
                  className={'input-modal'}
                />
                <label>Your job position:</label>
                <Input
                  className={'input-modal'}
                />
              </form>
            </div>
            <div className="wrapper-img">
              <label>Image:</label>
              <div>
                <input className="custom-file-input" id="btnInput" name="upload" type="file" title=" " />
                <Button
                  label={'Button'}
                  TypeBtn={'filled'}
                  onClick={() => console.log('Button')}
                  className={'btn-modal-img'}
                />
              </div>


              <div className="image-container" id="img-reset">
                {/* <canvas id="canvas"></canvas> */}
                <Avatar id={"img"} img={"myImg"} />
                {/* <img  id="img" className="startImg" src="assets/img/img.jpg" alt="image" /> */}
              </div>



            </div>
            <div className="wrapper-footer">
              <Button
                label={'Confirm'}
                TypeBtn={'filled'}
                onClick={() => console.log('Confirm')}
              />
              <Button
                label={'Cancel'}
                TypeBtn={'unfilled'}
                onClick={() => setModalActive(false)}
              />
            </div>
          </div>
        </ModalView>

      </div>


    </div>
  )
}

export default ContentMainPage;

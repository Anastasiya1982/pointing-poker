import React, { useCallback, useState } from 'react'
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import ModalView from '../modalView/ModalView';
import './contentMainPage.scss';

const ContentMainPage = () => {

  const [modalActive, setModalActive] = useState(false);
  
  const openModalStartGame = useCallback(
    () => {
      setModalActive(true);
    },
    [],
  );

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
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure nemo maxime
            ad sequi sapiente harum eum odit ducimus, necessitatibus placeat! 
            Doloremque eaque suscipit, fugiat nihil error tenetur corporis rem dolorem!
          </p>
        </ModalView>
                
      </div>
      

    </div>
  )
}

export default ContentMainPage;

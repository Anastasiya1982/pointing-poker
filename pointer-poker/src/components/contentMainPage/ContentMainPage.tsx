import React from 'react'
import Button from '../button/Button';
import Input from '../input/Input';
import './contentMainPage.scss';

const ContentMainPage = () => {
  return (
    <div className="wrapper-content">
      <img className="pp-img" src="../../assets/Group.svg" alt="pp_logo" />
      <div className="wrapper-start_game">
        <h2 className="h2-main_page">Start your planning:</h2>
        <span>Create session:</span>
        <Button 
        label={'Start new game'}
        TypeBtn={'filled'}
        onClick={() => console.log('click')}
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
      </div>
      

    </div>
  )
}

export default ContentMainPage;

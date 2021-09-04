import React from 'react'
import BtnConnect from '../btnConnect/BtnConnect';
import BtnStartNewGame from '../btnStartNewGame/BtnStartNewGame';
import './contentMainPage.css';

const ContentMainPage = () => {
  return (
    <div className="wrapper-content">
      <img className="pp-img" src="../../assets/Group1.svg" alt="pp_logo" />
      <div className="wrapper-start_game">
        <h2 className="h2-main_page">Start your planning:</h2>
        <span>Create session:</span>
        <BtnStartNewGame />
      </div>
      <div className="wrapper-connect">
        <h2 className="h2-main_page">OR:</h2>
        <p>Connect to lobby by URL:</p>
        <input />
        <BtnConnect />
      </div>
      

    </div>
  )
}

export default ContentMainPage

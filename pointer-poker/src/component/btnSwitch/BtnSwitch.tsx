import React from 'react';
import './btnSwitch.css';

const BtnSwitch = () => {
  return (
    <label htmlFor="sw" className="switch">
      <input type="checkbox" id="sw" />
      <span className="slider round" />
    </label>
  );
};

export default BtnSwitch;

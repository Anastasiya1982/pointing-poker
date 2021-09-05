import React, { FC } from 'react';
import './btnSwitch.css';

interface Props {
  onClick: () => void,
}

const BtnSwitch: FC<Props> = (onClick) => {
  return (
    <label htmlFor="sw" className="switch">
      <input type="checkbox" id="sw" />
      <span className="slider round" />
    </label>
  );
};

export default BtnSwitch;

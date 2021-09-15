import React, { FC, useState } from 'react';
import './btnSwitch.scss';

interface Props {
  callback?: () => void,
}

const BtnSwitch: FC<Props> = (props: Props) => {

  const [toggle, setToggle] = useState(false);

  return (
    <label htmlFor="sw" className="switch" onClick={props.callback}>
      <input type="checkbox" id="sw" />
      <span className="slider round" />
    </label>
  );
};

export default BtnSwitch;

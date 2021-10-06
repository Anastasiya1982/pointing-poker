import React, { ChangeEvent, FC } from 'react';
import './btnSwitch.scss';

interface Props {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const BtnSwitch: FC<Props> = ({ checked, onChange, id }) => {
  return (
    <label htmlFor={id} className="switch">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <span className="slider round" />
    </label>
  );
};

export default BtnSwitch;

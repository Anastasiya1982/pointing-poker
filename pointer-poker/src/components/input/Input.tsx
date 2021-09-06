import React, { FC } from 'react';
import classNames from 'classnames';
import './input.scss';

interface PropsInput {
  className?: string;
  value: string;
  onChange: () => void;
}

const Input: FC<PropsInput> = ({ className, value, onChange }) => {
  const classes = classNames('input-modal-main-page', className);
  return <input type="text" onChange={onChange} value={value} className={classes} />;
};

export default Input;

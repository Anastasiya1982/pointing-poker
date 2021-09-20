import React, { ChangeEvent, FC } from 'react';
import classNames from 'classnames';
import './input.scss';

interface PropsInput {
  className?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: FC<PropsInput> = ({ className, value, onChange, required }) => {
  const classes = classNames('input-modal-main-page', className);
  return <input type="text" onChange={onChange} value={value} className={classes} />;
};

export default Input;

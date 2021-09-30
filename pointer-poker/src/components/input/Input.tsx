import React, { ChangeEvent, FC } from 'react';
import classNames from 'classnames';
import './input.scss';

interface PropsInput {
  className?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?:string;
  maxlength?: number;
}

const Input: FC<PropsInput> = ({ className, value, onChange, required, placeholder, maxlength }) => {
  const classes = classNames('input-modal-main-page', className);
  return <input type="text" onChange={onChange} value={value} className={classes} placeholder={placeholder} maxLength={maxlength} defaultValue='' />;
};

export default Input;

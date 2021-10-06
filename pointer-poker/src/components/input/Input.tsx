import React, { ChangeEvent, FC } from 'react';
import classNames from 'classnames';
import './input.scss';

interface PropsInput {
  className?: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
}

const Input: FC<PropsInput> = ({ className, value, onChange, placeholder, id }) => {
  const classes = classNames('input-modal-main-page', className);
  return (
    <input
      type="text"
      onChange={onChange}
      className={classes}
      placeholder={placeholder}
      value={value}
      id={id}
    />
  );
};

Input.defaultProps = {
  className: '',
  value: '',
  placeholder: '',
  id: '',
};

export default Input;

import React, { FC } from 'react';
import classNames from 'classnames';
import './input.scss';

interface PropsInput {
  className?: string;
}

const Input: FC<PropsInput> = ({ className }) => {
  const classes = classNames('input-modal-main-page', className);
  return <input type="text" className={classes} />;
};

export default Input;

import React, { FC } from 'react';
import classNames from 'classnames';
import './button.css';

interface Props {
  label: string,
  onClick: () => void,
  className: string,
}

const Button: FC<Props> = ({
  label, onClick, className
}) => {

  const classes = classNames (
    'button-full',
    className
  );

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      >
      {label}
    </button>
  );
};

export default Button;


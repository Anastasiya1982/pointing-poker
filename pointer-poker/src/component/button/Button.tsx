import React, { FC } from 'react';
import classNames from 'classnames';
import './button.css';

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Button: FC<propTypes> = ({
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

type propTypes = {
  label: string,
  onClick: () => {},
  className: string,
};

export default Button;


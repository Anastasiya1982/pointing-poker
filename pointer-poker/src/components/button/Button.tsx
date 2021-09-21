import React, { FC } from 'react';
import classNames from 'classnames';
import './button.scss';

interface Props {
  label?: string;
  onClick?: (e: any) => void;
  className?: string;
  TypeBtn: 'filled' | 'unfilled';
}

type TypeBtn = 'filled' | 'unfilled';

const Button: FC<Props> = ({ label, onClick, className, TypeBtn }) => {
  return (
    <button
      type="button"
      className={classNames(TypeBtn === 'filled' ? 'filledBtn' : 'unfilledBtn', className)}
      onClick={onClick}
      >
      {label}
    </button>
  );
};

export default Button;

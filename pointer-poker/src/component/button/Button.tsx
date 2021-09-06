import React, { FC } from 'react';
import classNames from 'classnames';
import './button.scss';

interface Props {
  label: string,
  onClick: () => void,
  className?: string,
  typeBtn: string,
}

type typeBtn = 'filled' | 'unfilled'

const Button: FC<Props> = ({
  label, onClick, className, typeBtn
}) => {

  return (
    <button
      type="button"
      className={classNames(typeBtn==='filled' ? 'filledBtn' : 'unfilledBtn', className )} 
      onClick={onClick}
      >
      {label}
    </button>
  );
};

export default Button;


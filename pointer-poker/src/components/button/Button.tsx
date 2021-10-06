import React, { FC } from 'react';
// @ts-ignore
import classNames from 'classnames';
import './button.scss';

interface Props {
  label?: string;
  onClick?: (e: any) => void;
  className?: string;
  TypeBtn: 'filled' | 'unfilled';
  disabled?: boolean;
}

// type TypeBtn = 'filled' | 'unfilled';

const Button: FC<Props> = ({ label, onClick, className, TypeBtn, disabled }) => {
  return (
    <button
      type="button"
      className={classNames(TypeBtn === 'filled' ? 'filledBtn' : 'unfilledBtn', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  label: '',
  onClick: undefined,
  className: '',
  disabled: false,
};

export default Button;

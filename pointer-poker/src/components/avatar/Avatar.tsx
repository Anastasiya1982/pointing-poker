import classNames from 'classnames';
import React, { FC } from 'react';
import './avatar.scss';

interface Props {
  img?: string;
  fallbackText: string;
  className?: string;
}

const Avatar: FC<Props> = ({ img, fallbackText, className }) => {
  const classes = classNames('avatar-info', className);
  return <div className={classes}>{img ? <img src={img} alt="" /> : fallbackText}</div>;
};

export default Avatar;
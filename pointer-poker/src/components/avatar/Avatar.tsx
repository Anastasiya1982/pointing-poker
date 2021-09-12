import classNames from 'classnames';
import React, { FC } from 'react';
import './avatar.scss';

interface Props {
  img?: string;
  fallbackText: string;
  className?: string;
  id?: string;
}

const Avatar: FC<Props> = ({ img, fallbackText, className, id }) => {
  const classes = classNames('avatar-info', className);
  return <div className={classes}>{img ? <img src={img} id={id} alt="" /> : fallbackText}</div>;
};

export default Avatar;

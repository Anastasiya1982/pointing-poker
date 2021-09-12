import classNames from 'classnames';
import React, { FC } from 'react';
import './avatar.scss';

interface Props {
  img?: string  | undefined | HTMLImageElement;
  fallbackText?: string;
  className?: string;
  id?: string;
}

const Avatar: FC<Props> = ({ img, fallbackText, id }) => {
  return <div className="avatar-info">{img ? <img src={img} id={id} alt="" /> : fallbackText}</div>;
};

export default Avatar;
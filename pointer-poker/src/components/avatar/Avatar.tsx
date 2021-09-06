import React, { FC } from 'react';
import './avatar.scss';

interface Props {
  img?: string;
  fallbackText: string;
}

const Avatar: FC<Props> = ({ img, fallbackText }) => {
  return <div className="avatar-info">{img ? <img src={img} alt="" /> : fallbackText}</div>;
};

export default Avatar;

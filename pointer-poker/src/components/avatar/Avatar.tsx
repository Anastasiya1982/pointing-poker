import classNames from 'classnames';
// eslint-disable-next-line no-use-before-define
import React, { FC } from 'react';
import './avatar.scss';

interface Props {
  img?: string | {} | null;
  fallbackText?: string;
  className?: string;
  id?: string;
}

const Avatar: FC<Props> = ({ img, fallbackText, className, id }) => {
  const classes = classNames('avatar-info', className);
  // @ts-ignore
  return <div className={classes}>{img ? <img src={img} id={id} alt="" /> : fallbackText}</div>;
};

Avatar.defaultProps = {
  img: '',
  fallbackText: '',
  className: '',
  id: '',
};

export default Avatar;

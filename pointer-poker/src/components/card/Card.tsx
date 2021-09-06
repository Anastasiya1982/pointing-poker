import { faDivide } from '@fortawesome/free-solid-svg-icons';
import React, { FC } from 'react';
import './card.scss';

interface CardProps {
  number: number;
  img: string;
  onClick: () => void;
}

const Card: FC<CardProps> = ({ number, img, onClick }) => {
  return (
    <div className="card-container" onClick={onClick}>
      {img ? <img src={img} alt="" /> : number}
    </div>
  );
};

export default Card;

import { faDivide, faPen } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import React, { MouseEvent, FC, useCallback, useState, useEffect } from 'react';
import './card.scss';
import Cup from '../../assets/coffee.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setSelectedCardNumber } from '../../redux/game/gameReducer';

interface CardProps {
  number: number | string;
  id: string;
}

const Card: FC<CardProps> = ({ number, id }) => {
  const dispatch = useAppDispatch();
  const scoreType = useAppSelector((state) => state.game.scoreType);
  const isSelectedCard = useAppSelector((state) => state.game.selectedCardNumber);
  const value = scoreType === 'story point' ? 'SP' : '%';
  const [active, setActive] = useState(false);

  const handleActiveClass = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      setActive(!active);
      dispatch(setSelectedCardNumber(number));
    },
    [active, dispatch],
  );
  console.log(isSelectedCard);

  return (
    <div onClick={handleActiveClass} className={active ? 'active-card' : 'card-container'} id={id}>
      {number === 0 ? (
        <div className="card-coffee">
          <div className="card-unknown">unknown</div>
          <button className="btn-change-number">
            <FontAwesomeIcon className="lobby-page-icon" icon={faPen} />
          </button>
          <div className="card-img-conatainer">
            <img className="card-img" src={Cup} alt="Coffee" />
          </div>
          <div className="card-unknown-scale">unknown</div>
        </div>
      ) : (
        <div className="card">
          <div className="card-value">{value}</div>
          <button className="btn-change-number">
            <FontAwesomeIcon className="lobby-page-icon" icon={faPen} />
          </button>
          <div className="card-number">{number}</div>
          <div className="card-value-scale">{value}</div>
        </div>
      )}
    </div>
  );
};

export default Card;

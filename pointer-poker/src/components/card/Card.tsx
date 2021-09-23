import { faPen } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
// eslint-disable-next-line no-use-before-define
import React, { FC, useCallback } from 'react';
import './card.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cup from '../../assets/coffee.png';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSelectedCard } from '../../redux/game/gameReducer';

interface CardProps {
  number: number;
  id: number;
  className?: string;
}

const Card: FC<CardProps> = ({ number, id, className }) => {
  const dispatch = useAppDispatch();
  const scoreType = useAppSelector((state) => state.game.scoreType);
  const value = scoreType === 'story point' ? 'SP' : '%';
  const classes = classNames('card-container ', className);

  const handleChangeActiveCard = useCallback(() => {
    dispatch(setSelectedCard({ id, value }));
  }, [dispatch, id, value]);


  return (
    <div className={classes} onClick={handleChangeActiveCard} id={id}>
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

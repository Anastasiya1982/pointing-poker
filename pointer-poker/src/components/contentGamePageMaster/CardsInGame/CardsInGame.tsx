import React, { useEffect } from 'react';
import Card from '../../card/Card';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import './CardsInGame.scss';

const CardsInGame = () => {
  const cards = useAppSelector((state) => state.game.cards);
  const selectedCard = useAppSelector((state) => state.game.selectedCard);
  const dispatch=useAppDispatch();


  return (
    <div className="cards-game-container">
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            id={card.id}
            number={card.value}
            className={selectedCard?.id === card.id ? 'active-card' : 'card-container'}
          />
        );
      })}
    </div>
  );
};
export default CardsInGame;

import React from 'react';
import * as uuid from 'uuid';
import Card from '../../card/Card';
import { useAppSelector } from '../../../redux/hooks';
import './CardsInGame.scss';

const CardsInGame = () => {
  const cards = useAppSelector((state) => state.game.cards);
  const selectedCard = useAppSelector((state) => state.game.selectedCard);
  // const dispatch = useAppDispatch();

  return (
    <div className="cards-game-container">
      {cards.map((card) => {
        return (
          <Card
            key={uuid.v4()}
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

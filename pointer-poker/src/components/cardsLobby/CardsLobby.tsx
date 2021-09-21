import React, { ChangeEvent, useCallback, useState } from 'react';
import { setSelectedCard } from '../../redux/game/gameReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Card from '../card/Card';
import './cardsLobby.scss';

const CardsLobby = () => {
  const cards = useAppSelector((state) => state.game.cards);
  const selectedCard = useAppSelector((state) => state.game.selectedCard);

  return (
    <div className="cards-lobby-container">
      <div>Add card values:</div>
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            id={card.id}
            number={card.value}
            className={card.id === selectedCard?.id ? 'active-card' : 'card-container'}
          />
        );
      })}
    </div>
  );
};

export default CardsLobby;

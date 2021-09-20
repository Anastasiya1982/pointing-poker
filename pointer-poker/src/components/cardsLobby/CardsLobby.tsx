import React, { ChangeEvent, useCallback, useState } from 'react';
import { setCards } from '../../redux/game/gameReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Card from '../card/Card';
import './cardsLobby.scss';

const CardsLobby = () => {
  const cards = useAppSelector((state) => state.game.cards);

  return (
    <div className="cards-lobby-container">
      <div>Add card values:</div>
      {cards.map((card, index) => {
        return <Card key={index} id={card.id} number={card.value} />;
      })}
    </div>
  );
};

export default CardsLobby;

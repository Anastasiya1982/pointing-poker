import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { setCards } from '../../redux/game/gameReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Card from '../card/Card';
import './cardsLobby.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { generateRandomId, generateRandomNumber } from '../../utils/utils';


const CardsLobby = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.game.cards);
  const selectedCard = useAppSelector((state) => state.game.selectedCard);

  const handleAddCard = () => {
    let id = generateRandomId();
    let value = generateRandomNumber();
   let newCards=[...cards]
    dispatch(setCards([...newCards,{id,value}]));
  };
  console.log(selectedCard);
  return (
    <div className="cards-lobby-container">
      <div>Add card values:</div>
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            id={card.id}
            number={card.value}
            className='card-container'
          />
        );
      })}

      <div className="btn-add-card-container ">
        <button onClick={handleAddCard} className="btn-add-card">
          <FontAwesomeIcon size="4x" icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default CardsLobby;

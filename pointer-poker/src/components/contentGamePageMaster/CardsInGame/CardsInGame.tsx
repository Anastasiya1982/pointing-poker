import React, { useEffect } from 'react';
import Card from '../../card/Card';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import './CardsInGame.scss';
import socket from '../../../socket';
import { setCards, setIsTimerNeeded } from '../../../redux/game/gameReducer';
import { setIssues } from '../../../redux/issue/issueReducer';

const CardsInGame = () => {
  const cards = useAppSelector((state) => state.game.cards);
  const selectedCard = useAppSelector((state) => state.game.selectedCard);
  const dispatch=useAppDispatch();

  useEffect(() => {
    socket.on('game start', (settings) => {
      console.log(settings);
      dispatch(setCards(settings.cards));
      dispatch(setIsTimerNeeded(settings.isTimerNeeded));
      dispatch(setIssues({data:settings.issues}))
    });
  }, [dispatch]);


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

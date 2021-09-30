import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Card from '../card/Card';
import './cardsLobby.scss';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalView from '../../pages/modalView/ModalView';
import CreateCards from '../createCards/CreateCards';

const CardsLobby = () => {
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.game.cards);

  const openModalAddCard = useCallback(() => {
    setModalActive(true);
  }, []);

  return (
    <div className="cards-lobby-container">
      <div>Add card values:</div>
      {cards.map((card, index) => {
        return <Card key={index} id={card.id} number={card.value} className="card-container" />;
      })}

      <div className="btn-add-card-container ">
        <button onClick={openModalAddCard} className="btn-add-card">
          <FontAwesomeIcon size="4x" icon={faPlus} />
        </button>
      </div>
      <ModalView active={modalActive} setActive={setModalActive}>
        <CreateCards setModalActive={setModalActive} />
      </ModalView>
    </div>
  );
};

export default CardsLobby;

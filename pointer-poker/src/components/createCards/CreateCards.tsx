import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { setCards } from '../../redux/game/gameReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { generateRandomId } from '../../utils/utils';
import Button from '../button/Button';
import Input from '../input/Input';
import './createCards.scss';

interface PropsCardType {
  setModalActive: (modalActive: boolean) => void;
}

const CreateCards: FC<PropsCardType> = ({ setModalActive }) => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.game.cards);
  const [cardNumber, setCardNumber] = useState('');

  const onHandleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value);
  };

  const handleAddCard = (event: ChangeEvent<HTMLButtonElement>) => {
    let id = generateRandomId();
    const value = cardNumber;
    if (value === '' || !/^[1-9]+$/.test(value)) {
      return;
    }
    let newCards = [...cards];
    dispatch(setCards([...newCards, { id, value }]));
    setCardNumber('');
    setModalActive(false);
  };

  return (
    <div>
      <div className="header-modal-lobby-addCards">Create Card</div>
      <div className="content-modal-lobby-addCards">
        <div className="wrapper-content-modal-lobby-addCards">
          <span>Number:</span>
          <Input onChange={onHandleCardNumberChange} placeholder="number" value={cardNumber} />
        </div>
      </div>
      <div className="footer-modal-lobby-addCards">
        <Button label="Yes" TypeBtn="filled" onClick={handleAddCard} />
        <Button label="No" TypeBtn="unfilled" onClick={() => setModalActive(false)} />
      </div>
    </div>
  );
};

export default CreateCards;

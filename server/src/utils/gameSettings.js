let  cardsToPlay = [];
let activeCardsValue;

const setCards = (cards) => {
  cardsToPlay=cards;
  return cards;
};
const getAllCards = () =>cardsToPlay;

const deleteCard=(id)=>{
  cardsToPlay = cardsToPlay.filter(card=>card.id !== id)
}

const findActiveCardValue=(cardValue)=>{
  activeCardsValue=cardValue;
  return activeCardsValue
}
const getActiveCard=()=>activeCardsValue;

module.exports={
  setCards,
  getAllCards,
  deleteCard,
  findActiveCardValue,
  getActiveCard
};

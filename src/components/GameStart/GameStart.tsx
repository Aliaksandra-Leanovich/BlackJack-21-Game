import { useState } from "react";
import "../../App.css";
import { ICard } from "../../store/types";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/hooks";
import { getDeckId } from "../../store/selectors/deckIdSelectors";
import { cardsApi } from "../../services/CardsService";

const GameStart = () => {
  const navigate = useNavigate();
  const { deckId } = useAppSelector(getDeckId);
  const [cards, setCards] = useState<ICard[]>([]);

  const handleBack = () => {
    navigate(-1);
  };

  const getNewCard = async () => {
    const api = await cardsApi.getCard(deckId);
    setCards(cards.concat(api));
  };

  const onSubmit = () => {
    getNewCard();
  };

  return (
    <div>
      <Button handleClick={handleBack}>Back</Button>
      <Button type="submit" handleClick={onSubmit}>
        New Card
      </Button>

      {cards.map((card) => (
        <li key={card.code}>
          <p>{card.value}</p>
          <img src={card.image} alt={card.code} className="card" />
        </li>
      ))}
    </div>
  );
};

export default GameStart;

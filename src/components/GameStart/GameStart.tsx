import { useEffect, useState } from "react";
import "../../App.css";
import { ICard } from "../../store/types";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/hooks";
import {
  getDeckId,
  getDeckIdStatus,
} from "../../store/selectors/deckIdSelectors";
import { cardsApi } from "../../services/CardsService";
import { Spinner } from "../Spinner";

const GameStart = () => {
  const navigate = useNavigate();
  const { deckId } = useAppSelector(getDeckId);
  const status = useAppSelector(getDeckIdStatus);
  const [cardsForPlayer, setCardsForPlayer] = useState<ICard[]>([]);
  const [cardsForDealer, setCardsForDealer] = useState<ICard[]>([]);
  const [countPlayer, setCountPlayer] = useState(0);
  const [countDealer, setCountDealer] = useState(0);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    countPoints(cardsForDealer, setCountDealer);
    countPoints(cardsForPlayer, setCountPlayer);
  }, [cardsForDealer, cardsForPlayer]);
  const countPoints = (cards: ICard[], setPoints: (points: number) => void) => {
    let points = 0;
    cards.map((card: ICard) => {
      switch (card.value) {
        case "KING":
          points = points + 4;
          break;
        case "ACE":
          points = points + 11;
          break;
        case "JACK":
          points = points + 2;
          break;
        case "QUEEN":
          points = points + 3;
          break;
        default:
          points = +card.value + points;
      }
    });
    setPoints(points);
  };

  const getNewCard = async (
    cards: ICard[],
    setCards: (points: ICard[]) => void
  ) => {
    const api = await cardsApi.getCard(deckId);
    setCards(cards.concat(api));
  };

  const onSubmit = () => {
    getNewCard(cardsForPlayer, setCardsForPlayer);
    getNewCard(cardsForDealer, setCardsForDealer);
  };

  return (
    <div>
      <Button handleClick={handleBack}>Back</Button>
      <Button type="submit" handleClick={onSubmit}>
        New Card
      </Button>
      <div>
        <p>Player's points: {countPlayer}</p>
        <p>Dealer's points: {countDealer}</p>
      </div>
      <div style={{ display: "flex" }}>
        {cardsForPlayer.map((card) => (
          <li key={card.code}>
            <p>{card.value}</p>
            <img src={card.image} alt={card.code} className="card" />
          </li>
        ))}
        {cardsForDealer.map((card) => (
          <li key={card.code}>
            <p>{card.value}</p>
            <img src={card.image} alt={card.code} className="card" />
          </li>
        ))}
      </div>
    </div>
  );
};

export default GameStart;

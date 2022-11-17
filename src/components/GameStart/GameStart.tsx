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

export const GameStart = () => {
  const navigate = useNavigate();
  const { deckId } = useAppSelector(getDeckId);
  const [gameStatus, setGameStatus] = useState("Are you ready?");
  const [inProgress, setInProgress] = useState(true);
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
    stay();
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

  const getInitialCards = async (
    cards: ICard[],
    setCards: (points: ICard[]) => void
  ) => {
    const api = await cardsApi.getInitialCards(deckId);
    setCards(cards.concat(api));
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
    console.log(cardsForDealer);
  };
  const onFirstSubmit = () => {
    getInitialCards(cardsForPlayer, setCardsForPlayer);
    getInitialCards(cardsForDealer, setCardsForDealer);
  };

  const stay = () => {
    if (countPlayer > 21 && countPlayer > countDealer) {
      setInProgress(false);
      setGameStatus("Player Wins!");
    }
    if (countDealer > 21 && countDealer > countPlayer) {
      setInProgress(false);
      setGameStatus("Dealer Wins!");
    }
    if (countPlayer == 21) {
      setInProgress(false);
      setGameStatus("Player Wins!");
    }
    if (countDealer == 21) {
      setInProgress(false);
      setGameStatus("Dealer Wins!");
    }
    if (countPlayer === countDealer && countPlayer >= 21 && countDealer >= 21) {
      setInProgress(false);
      setGameStatus("Tie!");
    }
    return " ";
  };
  return (
    <div>
      <Button handleClick={handleBack}>Back</Button>
      <Button
        type="submit"
        handleClick={onFirstSubmit}
        disabled={cardsForDealer.length > 0 ? true : false}
      >
        Start
      </Button>
      <Button
        type="submit"
        handleClick={onSubmit}
        disabled={cardsForDealer.length > 0 && inProgress ? false : true}
      >
        New Card
      </Button>
      <div>
        <p>{inProgress}</p>
        <p>{gameStatus}</p>
        <p>Player's points: {countPlayer}</p>
        <p>Dealer's points: {countDealer}</p>
      </div>
      <div style={{ display: "flex" }}>
        {cardsForPlayer.map((card) => (
          <li key={card.code}>
            <img src={card.image} alt={card.code} className="card" />
          </li>
        ))}
      </div>
    </div>
  );
};

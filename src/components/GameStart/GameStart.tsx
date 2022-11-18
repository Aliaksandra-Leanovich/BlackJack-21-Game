import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { cardsApi } from "../../services/CardsService";
import { useAppSelector } from "../../store/hooks/hooks";
import {
  getDeckId,
  getDeckIdStatus,
} from "../../store/selectors/deckIdSelectors";
import { getUserHand, getUserPoints } from "../../store/selectors/userSelector";
import { ICard } from "../../store/types";
import { Button } from "../Button";
import { PlayerHand } from "../PlayerHand/PlayerHand";

export const GameStart = () => {
  const navigate = useNavigate();
  const status = useAppSelector(getDeckIdStatus);

  const hand = useAppSelector(getUserHand);
  const points = useAppSelector(getUserPoints);
  const { deckId } = useAppSelector(getDeckId);

  const [gameStatus, setGameStatus] = useState<string>("");
  const [inProgress, setInProgress] = useState(false);
  const [cardsForPlayer, setCardsForPlayer] = useState<ICard[]>([]);
  const [countDealer, setCountDealer] = useState(0);

  const handleBack = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   getGameResult();
  // }, []);

  const getInitialCards = async (
    cards: ICard[],
    setCards: (points: ICard[]) => void
  ) => {
    const api = await cardsApi.getCard(deckId, 2);
    setCards(cards.concat(api));
  };

  const getNewCard = async (
    cards: ICard[],
    setCards: (points: ICard[]) => void
  ) => {
    const api = await cardsApi.getCard(deckId, 1);
    setCards(cards.concat(api));
  };

  const onSubmit = () => {
    getNewCard(cardsForPlayer, setCardsForPlayer);
  };
  const onFirstSubmit = () => {
    setGameStatus("inprogress");
    setInProgress(true);
    getInitialCards(cardsForPlayer, setCardsForPlayer);
  };

  // const getGameResult = () => {
  //   if (countDealer < 21 && countPlayer > 21) {
  //     setInProgress(false);
  //     setGameStatus("fineshed");
  //   }

  //   if (countPlayer < 21 && countDealer > 21) {
  //     setInProgress(false);
  //     setGameStatus("fineshed");
  //   }
  //   if (countPlayer > 21 && countDealer > 21) {
  //     setInProgress(false);
  //     setGameStatus("fineshed");
  //   }

  //   if (countPlayer === 21) {
  //     setInProgress(false);
  //     setGameStatus("fineshed");
  //   }
  //   if (countDealer === 21) {
  //     setInProgress(false);
  //     setGameStatus("fineshed");
  //   }
  //   if (countPlayer === countDealer && countPlayer >= 21 && countDealer >= 21) {
  //     setInProgress(false);
  //     setGameStatus("fineshed");
  //   }
  //   return " ";
  // };
  return (
    <div>
      <Button handleClick={handleBack}>Back</Button>
      <Button
        type="submit"
        handleClick={onFirstSubmit}
        disabled={hand.length > 0 ? true : false}
      >
        Start
      </Button>
      <Button
        type="submit"
        handleClick={onSubmit}
        disabled={hand.length > 0 && inProgress ? false : true}
      >
        New Card
      </Button>
      <div>
        <p>{inProgress}</p>
        {/* <div>{inProgress ? <p>Good luck!</p> : <p>The winner is...</p>}</div> */}
        <p>Player's points: {points}</p>
        <p>Dealer's points: {countDealer}</p>
      </div>
      <PlayerHand cards={cardsForPlayer} />
    </div>
  );
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { cardsApi } from "../../services/CardsService";
import { useAppSelector } from "../../store/hooks/hooks";
import { getDeckId } from "../../store/selectors/deckIdSelectors";
import { getUserInfo, getUserPoints } from "../../store/selectors/userSelector";
import { ICard } from "../../store/types";
import { Button } from "../Button";
import { PlayerHand } from "../PlayerHand/PlayerHand";
import { countPoints } from "./count";

export const GameStart = () => {
  const navigate = useNavigate();

  const pointsPlayer = useAppSelector(getUserPoints);
  const { deckId } = useAppSelector(getDeckId);
  const { budget } = useAppSelector(getUserInfo);

  const [bet, setBate] = useState(100);
  const [gameStatus, setGameStatus] = useState<
    "idle" | "inprogress" | "finished" | "notstarted" | ""
  >("notstarted");
  const [winner, setWinner] = useState<"dealer" | "player" | "tie" | "">("");
  const [inProgress, setInProgress] = useState(false);
  const [cardsForPlayer, setCardsForPlayer] = useState<ICard[]>([]);
  const [cardsForDealer, setCardsForDealer] = useState<ICard[]>([]);
  const [countDealer, setCountDealer] = useState(0);

  const handleBack = () => {
    navigate(-1);
  };

  const countBudget = () => {};

  useEffect(() => {
    setCountDealer(countPoints(cardsForDealer));
    getGameResult();
  }, [cardsForDealer]);

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

  const onFirstSubmit = () => {
    setGameStatus("inprogress");
    setInProgress(true);
    getInitialCards(cardsForPlayer, setCardsForPlayer);
    getInitialCards(cardsForDealer, setCardsForDealer);
  };

  const onSubmit = () => {
    getNewCard(cardsForPlayer, setCardsForPlayer);
    getNewCard(cardsForDealer, setCardsForDealer);
  };
  const onStopSubmit = () => {
    setStopGame();
    setInProgress(false);
    setGameStatus("finished");
  };

  const setStopGame = () => {
    if (pointsPlayer < 21) {
      if (countDealer < 21) {
        if (pointsPlayer > countDealer) {
          setWinner("player");
        } else {
          setWinner("dealer");
        }
      } else {
        setWinner("player");
      }
    }
  };

  const getGameResult = () => {
    if (pointsPlayer > 21) {
      setInProgress(false);
      setGameStatus("finished");
      if (countDealer > 21) {
        if (countDealer < pointsPlayer) {
          setWinner("dealer");
        } else if (countDealer > pointsPlayer) {
          setWinner("player");
        }
      } else {
        setWinner("dealer");
      }
    }

    if (pointsPlayer === 21) {
      setInProgress(false);
      setGameStatus("finished");
      setWinner("player");
      if (countDealer === 21) {
        setWinner("tie");
      }
    }

    return " ";
  };
  return (
    <div>
      <Button handleClick={handleBack}>Back</Button>
      <Button
        type="submit"
        handleClick={onFirstSubmit}
        disabled={
          gameStatus === "inprogress"
            ? true
            : false || gameStatus !== "finished"
            ? false
            : true
        }
      >
        Start
      </Button>
      <Button
        type="submit"
        handleClick={onSubmit}
        disabled={
          gameStatus === "notstarted"
            ? true
            : false || gameStatus !== "finished"
            ? false
            : true
        }
      >
        New Card
      </Button>
      <Button
        type="submit"
        handleClick={onStopSubmit}
        disabled={
          gameStatus === "notstarted"
            ? true
            : false || gameStatus !== "finished"
            ? false
            : true
        }
      >
        Stop
      </Button>
      <div>
        <p>{inProgress}</p>

        <div>
          {gameStatus !== "finished" ? (
            <p>Good luck!</p>
          ) : (
            <p>The winner is... {winner}</p>
          )}
        </div>
        <p>Player's points: {pointsPlayer}</p>
        <p>Dealer's points: {countDealer}</p>
      </div>
      <PlayerHand cards={cardsForPlayer} />
    </div>
  );
};

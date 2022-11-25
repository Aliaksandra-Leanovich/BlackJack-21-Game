import { useEffect, useState } from "react";
import "../../App.css";
import { cardsApi } from "../../services/CardsService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getDeckId,
  getPlayers,
  getUserBudget,
  getUserInfo,
  getUserPoints,
} from "../../store/selectors";
import { fetchDeckId } from "../../store/slices/deckIdSlice";
import { unsetUserHand } from "../../store/slices/userSlices";
import { ICard, IPlayer } from "../../store/types";
import { BetForm } from "../BetForm";
import { Button } from "../Button";
import { PlayerHand } from "../PlayerHand";
import { getCardScore } from "./countPoints";
import { v4 as uuidv4 } from "uuid";
import { GameStatus } from "./types";

export const Game = () => {
  const dispatch = useAppDispatch();

  const pointsPlayer = useAppSelector(getUserPoints);
  const { deckId } = useAppSelector(getDeckId);
  const budget = useAppSelector(getUserBudget);

  const { email } = useAppSelector(getUserInfo);
  const { players } = useAppSelector(getPlayers);

  const [countDealer, setCountDealer] = useState(0);
  const [cardsForPlayer, setCardsForPlayer] = useState<ICard[]>([]);
  const [winner, setWinner] = useState<IPlayer[]>();
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.notstarted
  );

  const setDealersHand = async (initialScore: number = 0): Promise<number> => {
    const card: ICard[] = await cardsApi.getNewCard(deckId, 1);
    const cardScore = getCardScore(card[0]);

    const actualScore = initialScore + cardScore;

    if (actualScore < 21) {
      return setDealersHand(actualScore);
    }

    return actualScore;
  };

  useEffect(() => {
    dispatch(fetchDeckId());
  }, [pointsPlayer, dispatch, gameStatus]);

  const createArrayOfAllPlayers = () => {
    const player = { name: email, id: uuidv4(), points: pointsPlayer };
    const dealer = { name: "dealer", id: uuidv4(), points: countDealer };
    return [player, dealer, ...players];
  };

  const findWinner = () => {
    let winner: IPlayer[] = [];

    const players = createArrayOfAllPlayers();

    const lessThen21 = players.filter((player) => player.points < 21);
    const equal21 = players.filter((player) => player.points === 21);
    const moreThen21 = players.filter((player) => player.points > 21);

    if (equal21.length > 0) {
      return (winner = equal21);
    } else if (equal21.length === 0 && lessThen21.length > 0) {
      lessThen21.map((player) => {
        Math.max(+player.points);
      });
    }
    return winner;
  };

  const onStartSubmit = () => {
    setWinner([]);
    setCountDealer(0);
    setGameStatus(GameStatus.start);
    dispatch(unsetUserHand());
    setCardsForPlayer([]);
  };

  const onFirstSubmit = async () => {
    setGameStatus(GameStatus.inprogress);
    setCardsForPlayer(await cardsApi.getNewCard(deckId, 2));
  };

  const onSubmit = async () => {
    setCardsForPlayer(await cardsApi.getNewCard(deckId, 1));
  };

  const onStopSubmit = async () => {
    setGameStatus(GameStatus.finished);

    const dealerScore = await setDealersHand();
    setCountDealer(dealerScore);

    setWinner(findWinner());
    console.log(findWinner());
  };

  return (
    <div>
      <div>
        {gameStatus === "finished" ? (
          <div>
            The winner is...
            {winner?.map((player) => (
              <p>{player.name}</p>
            ))}
          </div>
        ) : (
          <p>Good luck!</p>
        )}
      </div>
      <div
        className={
          gameStatus === "notstarted" || gameStatus === "finished"
            ? "block-start"
            : "block-start-hidden"
        }
      >
        {budget < 0 ? (
          <>
            <p>sorry, you dont have money left</p>
          </>
        ) : (
          <>
            <Button type="submit" handleClick={onStartSubmit}>
              START NEW GAME
            </Button>
          </>
        )}
      </div>
      <div
        className={
          gameStatus === "start" ? "block-start" : "block-start-hidden "
        }
      >
        <BetForm
          // winner={winner}
          onFirstSubmit={onFirstSubmit}
          gameStatus={gameStatus}
        />
      </div>
      <div
        className={
          gameStatus === "inprogress" ? "block-start" : "block-start-hidden "
        }
      >
        <Button
          type="submit"
          handleClick={onSubmit}
          disabled={
            gameStatus === "notstarted" || gameStatus === "finished"
              ? true
              : false
          }
        >
          New Card
        </Button>
        <Button
          type="submit"
          handleClick={onStopSubmit}
          disabled={
            gameStatus === "notstarted" || gameStatus === "finished"
              ? true
              : false
          }
        >
          Stop
        </Button>

        <p>Player's points: {pointsPlayer}</p>
      </div>

      <PlayerHand cards={cardsForPlayer} />
      <div>
        {gameStatus === "finished" && countDealer > 0 ? (
          <div>
            <p>Dealer's points: {countDealer}</p>
            <p>Player's points: {pointsPlayer}</p>
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

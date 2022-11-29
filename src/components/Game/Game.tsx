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
import "./style.scss";
import { Robot } from "../Robot/Robot";

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
  const [playerWin, setPlayerWin] = useState<boolean>();
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
  }, [dispatch]);

  const onStartSubmit = () => {
    setWinner([]);
    setPlayerWin(false);
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

  const setResultForPlayer = () => {
    winner?.forEach((player) => {
      player.name === email ? setPlayerWin(true) : setPlayerWin(false);
    });
    // do not changes into true
  };

  const onStopSubmit = async () => {
    setGameStatus(GameStatus.finished);

    setCountDealer(await setDealersHand());

    setWinner(findWinner());

    setResultForPlayer();
  };

  const createArrayOfAllPlayers = () => {
    const player = { name: email, id: uuidv4(), points: pointsPlayer };
    const dealer = { name: "dealer", id: uuidv4(), points: countDealer }; //dealer do no rewrite his points
    return [player, dealer, ...players];
  };

  const findWinner = () => {
    let winner: IPlayer[] = [];

    const players = createArrayOfAllPlayers();

    const lessThan21 = players.filter((player) => player!.points < 21);
    const equal21 = players.filter((player) => player!.points === 21);

    if (equal21.length > 0) {
      return winner.concat(equal21);
    }
    if (equal21.length === 0 && lessThan21.length > 0) {
      const users = lessThan21.filter(
        (user) =>
          user.points ===
          Math.max.apply(
            Math,
            lessThan21.map((players) => players.points)
          )
      );
      return winner.concat(users);
    }
    return winner;
  };

  return (
    <div className="game">
      <div className="game__robot">
        <Robot />
        <div className="game__comment">
          {gameStatus === "finished" ? (
            <div className="game__comment__message">
              the winner is...
              {winner?.map((player) => (
                <p key={player.id}>{player.name}</p>
              ))}
            </div>
          ) : (
            <p className="game__message">good luck!</p>
          )}
        </div>
      </div>
      <div
        className={
          gameStatus === "notstarted" || gameStatus === "finished"
            ? "block-start"
            : "block-start-hidden"
        }
      >
        {budget === 0 ? (
          <>
            <p className="game__message">sorry, you dont have money left</p>
          </>
        ) : (
          <>
            <Button
              type="submit"
              handleClick={onStartSubmit}
              className="new-game"
            >
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
          winner={playerWin}
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

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
import { Robot } from "../Robot/Robot";
import { getCardScore } from "./countPoints";
import styles from "./Game.module.scss";
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
    // setCountDealer(0);
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
      player.name == email ? setPlayerWin(true) : setPlayerWin(false);
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
    const dealer = { name: "dealer", id: uuidv4(), points: countDealer }; ///!!!!!
    return [player, dealer, ...players];
  };

  const findWinner = () => {
    let winner: IPlayer[] = [];

    const players = createArrayOfAllPlayers();
    console.log(players);

    const lessThan21 = players.filter((player) => player.points < 21);
    const equal21 = players.filter((player) => player.points == 21);

    if (equal21.length) {
      return winner.concat(equal21);
    }
    if (!equal21.length && lessThan21.length) {
      const users = lessThan21.filter(
        (user) =>
          user.points ==
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
    <div className={styles.game}>
      <div className={styles.robot}>
        <Robot />
        <div className={styles.comment}>
          {gameStatus == GameStatus.finished ? (
            <div className={styles.message}>
              the winner is...
              {winner?.map((player) => (
                <p key={player.id}>{player.name}</p>
              ))}
            </div>
          ) : (
            <p className={styles.message}>good luck!</p>
          )}
        </div>
      </div>
      <div
        className={
          gameStatus == GameStatus.notstarted ||
          gameStatus == GameStatus.finished
            ? styles.block__visible
            : styles.block__hidden
        }
      >
        {!budget ? (
          <p className={styles.message}>sorry, you dont have money left</p>
        ) : (
          <Button type="submit" handleClick={onStartSubmit}>
            START NEW GAME
          </Button>
        )}
      </div>

      <BetForm
        winner={playerWin}
        onFirstSubmit={onFirstSubmit}
        gameStatus={gameStatus}
      />

      <div
        className={
          gameStatus == GameStatus.inprogress
            ? styles.block__visible
            : styles.block__hidden
        }
      >
        <Button type="submit" handleClick={onSubmit}>
          stay
        </Button>
        <Button type="submit" handleClick={onStopSubmit}>
          hit
        </Button>

        <p className={styles.message}>your points: {pointsPlayer}</p>
      </div>

      <PlayerHand cards={cardsForPlayer} />
      <div>
        {gameStatus == GameStatus.finished ? (
          <div>
            <p className={styles.result}>dealer's points: {countDealer}</p>
            <p className={styles.result}>player's points: {pointsPlayer}</p>
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

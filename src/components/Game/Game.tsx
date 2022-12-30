import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GameStatus } from "../../enums";
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

export const Game = () => {
  const dispatch = useAppDispatch();

  const pointsPlayer = useAppSelector(getUserPoints);
  const { deckId } = useAppSelector(getDeckId);
  const budget = useAppSelector(getUserBudget);

  const { email, id } = useAppSelector(getUserInfo);
  const { players } = useAppSelector(getPlayers);

  const [countDealer, setCountDealer] = useState(0);
  const [cardsForPlayer, setCardsForPlayer] = useState<ICard[]>([]);
  const [winner, setWinner] = useState<IPlayer[]>();
  const [playerWin, setPlayerWin] = useState(false);
  const [gameStatus, setGameStatus] = useState(GameStatus.notStarted);

  const dealer = { name: "dealer", id: uuidv4(), points: countDealer };

  const setDealersHand = async (initialScore: number = 0): Promise<number> => {
    const card: ICard[] = await cardsApi.getNewCard(deckId, 1);
    const cardScore = getCardScore(card[0]);

    const actualScore = initialScore + cardScore;

    if (actualScore < 21) {
      return setDealersHand(actualScore);
    }

    return actualScore;
  };

  const onStartNewGameSubmit = useCallback(() => {
    setGameStatus(GameStatus.start);
    dispatch(fetchDeckId());
    unsetPreviousGame();
  }, [gameStatus, deckId]);

  const unsetPreviousGame = () => {
    setWinner([]);
    setCountDealer(0);
    setPlayerWin(false);
    dispatch(unsetUserHand());
    setCardsForPlayer([]);
  };

  const onBetFormSubmit = async () => {
    setGameStatus(GameStatus.inProgress);
    setCardsForPlayer(await cardsApi.getNewCard(deckId, 2));
    setCountDealer(await setDealersHand());
  };

  const onHitSubmit = async () => {
    setCardsForPlayer(await cardsApi.getNewCard(deckId, 1));
  };

  const onStaySubmit = useCallback(() => {
    setGameStatus(GameStatus.finished);

    setWinner(findWinner());

    setResultForPlayer(findWinner());
  }, [gameStatus, winner]);

  const createArrayOfAllPlayers = () => {
    const player = { name: email, id, points: pointsPlayer };

    return [player, dealer, ...players];
  };

  const findWinner = () => {
    let winner: IPlayer[] = [];

    const players = createArrayOfAllPlayers();

    const playersWithPointsLessThan21 = players.filter(
      (player) => player.points < 21
    );
    const playersWithPointsEqual21 = players.filter(
      (player) => player.points === 21
    );

    if (playersWithPointsEqual21.length) {
      return winner.concat(playersWithPointsEqual21);
    }

    if (
      !playersWithPointsEqual21.length &&
      playersWithPointsLessThan21.length
    ) {
      const users = playersWithPointsLessThan21.filter(
        (user) =>
          user.points ===
          Math.max(
            ...playersWithPointsLessThan21.map((players) => players.points)
          )
      );
      return winner.concat(users);
    }
    return winner;
  };

  const setResultForPlayer = (winner: IPlayer[]) => {
    let user = winner.find((player) => player.id === id);
    if (user?.id) {
      setPlayerWin(true);
    }
  };

  return (
    <div className={styles.game}>
      <div className={styles.robot}>
        <Robot />
        <div className={styles.comment}>
          {gameStatus === GameStatus.finished ? (
            <>
              <p className={styles.result}>dealer's points: {countDealer}</p>
              <p className={styles.result}>
                {email} points: {pointsPlayer}
              </p>
              <div className={styles.message}>
                the winner is...
                {winner?.map((player) => (
                  <p key={player.id}>
                    {player.name} with {player.points} points
                  </p>
                ))}
              </div>
            </>
          ) : (
            <p className={styles.message}>good luck!</p>
          )}
        </div>
      </div>

      {(gameStatus === GameStatus.notStarted ||
        gameStatus === GameStatus.finished) &&
        (!budget ? (
          <p className={styles.message}>sorry, you dont have money left</p>
        ) : (
          <Button type="submit" handleClick={onStartNewGameSubmit}>
            START NEW GAME
          </Button>
        ))}

      <BetForm
        winner={playerWin}
        onBetFormSubmit={onBetFormSubmit}
        gameStatus={gameStatus}
      />

      {gameStatus === GameStatus.inProgress && (
        <div>
          <Button type="submit" handleClick={onHitSubmit}>
            hit
          </Button>
          <Button type="submit" handleClick={onStaySubmit}>
            stay
          </Button>
          <p className={styles.message}>your points: {pointsPlayer}</p>
        </div>
      )}

      <PlayerHand cards={cardsForPlayer} />
    </div>
  );
};

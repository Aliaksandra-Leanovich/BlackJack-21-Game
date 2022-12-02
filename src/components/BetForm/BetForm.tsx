import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserBudget } from "../../store/selectors";
import { setBudget } from "../../store/slices/userSlices";
import { Button } from "../Button";
import { GameStatus } from "../Game/types";
import { InputRange } from "../InputRange";
import styles from "./BetForm.module.scss";
import { IBetFormProps } from "./types";

export const BetForm = ({
  winner,
  gameStatus,
  onFirstSubmit,
}: IBetFormProps) => {
  const dispatch = useAppDispatch();

  let budget = useAppSelector(getUserBudget);

  const { handleSubmit } = useForm();

  const [state, setState] = useState(budget);

  useEffect(() => {
    if (winner) {
      dispatch(setBudget((budget = budget + state * 2)));
    }
  }, [dispatch, winner]);

  const countBudget = () => {
    dispatch(setBudget((budget = budget - state)));
  };

  const onSubmit = () => {
    countBudget();
    onFirstSubmit();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(parseInt(event.target.value));
  };

  return (
    <div
      className={
        gameStatus == GameStatus.finished || gameStatus == GameStatus.notstarted
          ? styles.block__hidden
          : styles.block__visible
      }
    >
      {gameStatus == GameStatus.start ? (
        <div className={styles.bet}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label className={styles.label}>enter your bet</label>
            <InputRange
              min={100}
              max={budget}
              value={state}
              className={styles.input}
              onChange={handleChange}
              step={100}
            />
            <p className={styles.label}>{state}</p>
            <Button type="submit" className={styles.button}>
              bet
            </Button>
          </form>
        </div>
      ) : (
        <div className={styles.state}>
          <div className={styles.chip}></div>
          <p className={styles.count}> {state}</p>
        </div>
      )}
    </div>
  );
};

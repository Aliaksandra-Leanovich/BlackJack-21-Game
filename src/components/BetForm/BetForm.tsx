import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserBudget } from "../../store/selectors";
import { setBudget } from "../../store/slices/userSlices";
import { Button } from "../Button";
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

  const [state, setState] = useState<number>(budget);

  useEffect(() => {
    if (winner) {
      dispatch(setBudget((budget = budget + state * 2)));
    }
  }, [dispatch, gameStatus]);

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
        gameStatus === "finished" || gameStatus === "notstarted"
          ? styles.block__hidden
          : styles.block__visible
      }
    >
      {gameStatus === "start" ? (
        <div className={styles.bet}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.bet__form}>
            <label className={styles.bet__label}>enter your bet</label>
            <InputRange
              min={100}
              max={budget}
              type="range"
              value={state}
              onChange={handleChange}
              step={100}
            />
            <p className={styles.bet__label}>{state}</p>
            <Button
              type="submit"
              disabled={budget < state ? true : false}
              className={styles.bet__button}
            >
              bet
            </Button>
          </form>
        </div>
      ) : (
        <div className={styles.bet__state}>
          <div className={styles.bet__state__chip}></div>
          <p className={styles.bet__state__count}> {state}</p>
        </div>
      )}
    </div>
  );
};

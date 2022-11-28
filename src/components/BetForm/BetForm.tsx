import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserBudget, getUserInfo } from "../../store/selectors";
import { setBudget } from "../../store/slices/userSlices";
import { Button } from "../Button";
import { InputRange } from "../InputRange";
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
  console.log(winner);
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
    <>
      {gameStatus === "start" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Enter You Bet</label>
          <InputRange
            min={100}
            max={budget}
            type="range"
            value={state}
            onChange={handleChange}
            step={100}
          />
          <p>{state}</p>
          <Button type="submit" disabled={budget < state ? true : false}>
            Bet
          </Button>
        </form>
      ) : (
        <p>Your bet is {state}</p>
      )}
    </>
  );
};

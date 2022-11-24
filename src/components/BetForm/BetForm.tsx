import React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getUserBudget } from "../../store/selectors/userSelector";
import { setBudget } from "../../store/slices/userSlices";
import { Button } from "../Button";
import { InputRange } from "../InputRange/InputRange";
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
    if (gameStatus === "finished" && winner !== "dealer") {
      dispatch(setBudget((budget = budget + state * 2)));
    }
  }, [winner, dispatch]);

  const countBudget = () => {
    dispatch(setBudget((budget = budget - state)));
  };

  const onSubmit = () => {
    countBudget();
    onFirstSubmit();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(parseInt(event.target.value));
  }
  // eslint-enable-react-in-jsx-scope
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

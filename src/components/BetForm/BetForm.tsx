import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getUserBudget } from "../../store/selectors/userSelector";
import { setBudget } from "../../store/slices/userSlices";
import { Button } from "../Button";
import { Input } from "../Input";
import { IBetFormProps } from "./types";

export const BetForm = ({
  winner,
  gameStatus,
  onFirstSubmit,
}: IBetFormProps) => {
  const dispatch = useAppDispatch();
  let budget = useAppSelector(getUserBudget);

  const { register, handleSubmit } = useForm();

  const [state, setState] = useState<number>(5000);

  useEffect(() => {
    countBudget();
  }, [winner, dispatch]);

  const countBudget = () => {
    if (winner === "player") {
      dispatch(setBudget((budget = budget + state)));
    }
    if (winner === "dealer") {
      dispatch(setBudget((budget = budget - state)));
    }
  };

  const onSubmit = () => {
    onFirstSubmit();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(parseInt(e.target.value));
  };

  return (
    <>
      {gameStatus === "start" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Enter You Bet</label>
          <Input
            min={100}
            max={budget}
            type="range"
            value={state}
            onChange={handleChange}
            step={100}
            label="bet"
            register={register}
          />
          <p>{state}</p>
          <Button type="submit">Bet</Button>
        </form>
      ) : (
        <p>Your bet is {state}</p>
      )}
    </>
  );
};

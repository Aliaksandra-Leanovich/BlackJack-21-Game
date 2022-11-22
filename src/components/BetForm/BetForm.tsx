import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getUserBudget } from "../../store/selectors/userSelector";
import { setBudget } from "../../store/slices/userSlices";
import { Button } from "../Button";
import { Input } from "../Input";

interface IProps {
  winner: string;
  onFirstSubmit: () => void;
  disabled: boolean;
}

export const BetForm = ({ winner, disabled, onFirstSubmit }: IProps) => {
  const dispatch = useAppDispatch();
  let budget = useAppSelector(getUserBudget);

  let [bet, setBet] = useState<number>(0);

  const { register, getValues, reset, handleSubmit } = useForm();

  useEffect(() => {
    countBudget();
  }, [winner, setBet, dispatch]);

  const countBudget = () => {
    if (winner === "player") {
      dispatch(setBudget((budget = budget + bet)));
    }
    if (winner === "dealer") {
      dispatch(setBudget((budget = budget - bet)));
    }
  };

  const onSubmit = () => {
    onFirstSubmit();
    setBet(Number(getValues("bet")));
    reset();
  };

  return (
    <>
      {bet === 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="number"
            placeholder="Enter your bet"
            label="bet"
            register={register}
          />
          <Button type="submit" disabled={disabled}>
            Bet
          </Button>
        </form>
      ) : (
        <p>Your bet is {bet}</p>
      )}
    </>
  );
};

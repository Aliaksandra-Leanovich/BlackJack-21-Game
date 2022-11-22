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
  let [bet, setBet] = useState<number>(100);
  const { register, getValues, reset } = useForm();
  let budget = useAppSelector(getUserBudget);

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
  const handleSubmit = () => {
    setBet(Number(getValues("bet")));
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="number"
        placeholder="Enter your bet"
        label="bet"
        register={register}
      />
      <Button type="submit" disabled={disabled} handleClick={onFirstSubmit}>
        Bet
      </Button>
    </form>
  );
};

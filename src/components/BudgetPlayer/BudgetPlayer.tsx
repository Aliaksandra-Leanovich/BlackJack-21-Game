import { useAppSelector } from "../../store/hooks";
import { getUserInfo } from "../../store/selectors";

export const BudgetPlayer = () => {
  const { budget } = useAppSelector(getUserInfo);
  return (
    <div>
      <p>{budget}</p>
    </div>
  );
};

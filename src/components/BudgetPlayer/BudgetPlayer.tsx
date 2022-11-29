import { useAppSelector } from "../../store/hooks";
import { getUserInfo } from "../../store/selectors";
import "./style.scss";

export const BudgetPlayer = () => {
  const { budget } = useAppSelector(getUserInfo);
  return (
    <div>
      <p className="budget">{budget}</p>
    </div>
  );
};

import { useAppSelector } from "../../store/hooks";
import { getUserInfo } from "../../store/selectors";
import { BudgetPlayer } from "../BudgetPlayer/BudgetPlayer";
import "./style.scss";

export const PlayerInformation = () => {
  const { email, budget } = useAppSelector(getUserInfo);
  return (
    <div className="account">
      <p className="account__email">{email}</p>
      <BudgetPlayer />
    </div>
  );
};

import { Navigate, useNavigate } from "react-router-dom";
import { BudgetPlayer } from "../components/BudgetPlayer/BudgetPlayer";
import { Button } from "../components/Button";
import { Game } from "../components/Game/Game";
import { routes } from "../routes/routes";
import { useAppSelector } from "../store/hooks/hooks";
import { getUserInfo } from "../store/selectors/userSelector";

export const GamePage = () => {
  const navigate = useNavigate();

  const { isAuthorized } = useAppSelector(getUserInfo);

  const handleBack = () => {
    navigate(-1);
  };

  if (isAuthorized !== null) {
    return (
      <div>
        <div>
          <Button handleClick={handleBack}>Back</Button>
        </div>
        <BudgetPlayer />
        <Game />
      </div>
    );
  }
  return <Navigate to={routes.SIGNUP} />;
};

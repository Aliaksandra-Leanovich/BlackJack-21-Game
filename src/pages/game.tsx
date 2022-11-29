import { Navigate, useNavigate } from "react-router-dom";
import { BudgetPlayer } from "../components/BudgetPlayer/BudgetPlayer";
import { Button } from "../components/Button";
import { Game } from "../components/Game/Game";
import { Header } from "../components/Header/Header";
import { routes } from "../routes/routes";
import { useAppSelector } from "../store/hooks/hooks";
import { getUserInfo } from "../store/selectors/userSelector";

export const GamePage = () => {
  const { isAuthorized } = useAppSelector(getUserInfo);

  if (isAuthorized !== "") {
    return (
      <>
        <Header />
        <Game />
      </>
    );
  }
  return <Navigate to={routes.SIGNUP} />;
};

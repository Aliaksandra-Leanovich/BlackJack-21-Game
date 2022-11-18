import { Navigate } from "react-router-dom";
import { GameStart } from "../components/GameStart/GameStart";
import { routes } from "../routes/routes";
import { useAppSelector } from "../store/hooks/hooks";
import { getUserInfo } from "../store/selectors/userSelector";

export const GamePage = () => {
  const { name, budget } = useAppSelector(getUserInfo);

  const { isAuthorized } = useAppSelector(getUserInfo);

  if (isAuthorized) {
    return (
      <div>
        <div>
          <p>{name}</p>
          <p>{budget}</p>
        </div>
        <GameStart />
      </div>
    );
  }
  return <Navigate to={routes.SIGNUP} />;
};

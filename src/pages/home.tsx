import { Navigate } from "react-router-dom";
import { LinkTemplate } from "../components/LinkTemplate";
import { routes } from "../routes/routes";
import { useAppSelector } from "../store/hooks/hooks";
import { getUserInfo } from "../store/selectors/userSelector";

export const HomePage = () => {
  const { isAuthorized } = useAppSelector(getUserInfo);

  if (isAuthorized) {
    return (
      <div>
        <LinkTemplate to={routes.ACCOUNT}>Account</LinkTemplate>
        <LinkTemplate to={routes.GAME}>Start Game</LinkTemplate>
      </div>
    );
  }
  return <Navigate to={routes.SIGNUP} />;
};

import { Navigate } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { LinkTemplate } from "../components/LinkTemplate";
import { Robot } from "../components/Robot/Robot";
import { routes } from "../routes/routes";
import { useAppSelector } from "../store/hooks/hooks";
import { getUserInfo } from "../store/selectors/userSelector";
import "./style.scss";

export const HomePage = () => {
  const { isAuthorized } = useAppSelector(getUserInfo);

  if (isAuthorized !== "") {
    return (
      <>
        <Header />
        <div className="home">
          <Robot />
          <LinkTemplate to={routes.GAME} className="bounce">
            Play Game
          </LinkTemplate>
        </div>
      </>
    );
  }
  return <Navigate to={routes.SIGNUP} />;
};

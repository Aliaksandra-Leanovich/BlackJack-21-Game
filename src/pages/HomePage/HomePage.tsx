import { Navigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { LinkTemplate } from "../../components/Link";
import { Robot } from "../../components/Robot/Robot";
import { routes } from "../../routes/routes";
import { useAppSelector } from "../../store/hooks/hooks";
import { getUserInfo } from "../../store/selectors/userSelector";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const { isAuthorized } = useAppSelector(getUserInfo);

  if (isAuthorized !== "") {
    return (
      <>
        <Header />
        <div className={styles.home}>
          <Robot />
          <LinkTemplate to={routes.GAME}>Play Game</LinkTemplate>
        </div>
      </>
    );
  }
  return <Navigate to={routes.SIGNUP} />;
};

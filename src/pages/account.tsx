import { Navigate } from "react-router-dom";
import { PlayerInformation } from "../components/Account/PlayerInformation";
import { Header } from "../components/Header/Header";
import { routes } from "../routes/routes";
import { useAppSelector } from "../store/hooks";
import { getUserInfo } from "../store/selectors/userSelector";

export const Account = () => {
  const { isAuthorized } = useAppSelector(getUserInfo);

  if (isAuthorized !== "") {
    return (
      <>
        <Header />
        <PlayerInformation />
      </>
    );
  }
  return <Navigate to={routes.SIGNUP} />;
};

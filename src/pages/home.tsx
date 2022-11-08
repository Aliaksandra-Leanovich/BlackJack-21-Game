import { Navigate, useNavigate } from "react-router-dom";
import { LinkTemplate } from "../components/LinkTemplate";
import { routes } from "../routes/routes";
import { useAppSelector } from "../store/hooks/hooks";
import { getUserInfo } from "../store/selectors/userSelector";

const HomePage = () => {
  const { isAuthorized } = useAppSelector(getUserInfo);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  if (typeof isAuthorized !== null) {
    return (
      <div>
        {/* <Button handleClick={handleBack}>Back</Button> */}
        <LinkTemplate to={routes.ACCOUNT}>Account</LinkTemplate>
        <LinkTemplate to={routes.GAME}>Start Game</LinkTemplate>
      </div>
    );
  }
  return <Navigate to={routes.SIGNUP} />;
};

export default HomePage;

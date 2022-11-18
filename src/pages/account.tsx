import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { routes } from "../routes/routes";
import { useAppSelector } from "../store/hooks/hooks";
import { getUserInfo } from "../store/selectors/userSelector";

export const Account = () => {
  const { name, budget } = useAppSelector(getUserInfo);
  const { isAuthorized } = useAppSelector(getUserInfo);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  if (isAuthorized) {
    return (
      <div>
        <Button handleClick={handleBack}>Back</Button>
        <p>{name}</p>
        <p>{budget}</p>
      </div>
    );
  }
  return <Navigate to={routes.SIGNUP} />;
};

import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { routes } from "../routes/routes";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { getUserInfo } from "../store/selectors/userSelector";
import { unsetUser } from "../store/slices/userSlices";

export const Account = () => {
  const { email, budget } = useAppSelector(getUserInfo);
  const { isAuthorized } = useAppSelector(getUserInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    dispatch(unsetUser());
    localStorage.setItem("user", "");
  };

  if (isAuthorized !== null) {
    return (
      <div>
        <Button type="submit" handleClick={handleBack}>
          Back
        </Button>
        <p>{email}</p>
        <p>{budget}</p>
        <Button type="submit" handleClick={handleLogout}>
          Log Out
        </Button>
      </div>
    );
  }
  return <Navigate to={routes.SIGNUP} />;
};

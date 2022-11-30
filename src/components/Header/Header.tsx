import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useAppDispatch } from "../../store/hooks";
import { unsetUser } from "../../store/slices/userSlices";
import { BudgetPlayer } from "../BudgetPlayer/BudgetPlayer";
import { Button } from "../Button";
import { LinkTemplate } from "../Link";
import styles from "./Header.module.scss";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(unsetUser());
    navigate("/sign-up");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <Button type="submit" handleClick={handleBack}>
        Back
      </Button>
      <LinkTemplate to={routes.ACCOUNT}>My Account</LinkTemplate>
      <BudgetPlayer />
      <Button type="submit" handleClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};

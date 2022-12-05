import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useAppDispatch } from "../../store/hooks";
import { unsetUser } from "../../store/slices/userSlices";
import { BudgetPlayer } from "../BudgetPlayer/BudgetPlayer";
import { Button } from "../Button";
import { Link } from "../Link";
import styles from "./Header.module.scss";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(unsetUser());
    navigate(routes.SIGNIN);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <Button type="submit" handleClick={handleBack}>
        Back
      </Button>
      <Link to={routes.ACCOUNT}>My Account</Link>
      <BudgetPlayer />
      <Button type="submit" handleClick={handleLogout}>
        Sign Out
      </Button>
    </div>
  );
};

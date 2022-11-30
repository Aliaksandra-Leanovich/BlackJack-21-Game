import { useAppSelector } from "../../store/hooks";
import { getUserInfo } from "../../store/selectors";
import { BudgetPlayer } from "../BudgetPlayer/BudgetPlayer";
import styles from "./PlayerInformation.module.scss";

export const PlayerInformation = () => {
  const { email } = useAppSelector(getUserInfo);
  return (
    <div className={styles.account}>
      <p className={styles.account__email}>{email}</p>
      <BudgetPlayer />
    </div>
  );
};

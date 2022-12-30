import { useAppSelector } from "../../store/hooks";
import { getUserInfo } from "../../store/selectors";
import styles from "./BudgetPlayer.module.scss";

export const BudgetPlayer = () => {
  const { budget } = useAppSelector(getUserInfo);
  return <p className={styles.budget}>{budget}</p>;
};

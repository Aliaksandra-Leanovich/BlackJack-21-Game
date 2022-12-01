import styles from "./Card.module.scss";
import { IProps } from "./types";

export const Card = ({ card }: IProps) => {
  return (
    <div className={styles.card}>
      <img src={card.image} alt={card.code} className={styles.image} />
    </div>
  );
};

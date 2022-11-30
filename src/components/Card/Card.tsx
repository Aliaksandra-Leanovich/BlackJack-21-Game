import styles from "./Card.module.scss";
import { IProps } from "./types";

export const Card = ({ card }: IProps) => {
  return (
    <div>
      <img src={card.image} alt={card.code} className={styles.card} />
    </div>
  );
};

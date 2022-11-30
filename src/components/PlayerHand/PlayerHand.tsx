import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserHand } from "../../store/selectors";
import { setUserHand, setUserPoints } from "../../store/slices/userSlices";
import { Card } from "../Card/Card";
import { countPoints } from "../Game/countPoints";
import styles from "./PlayerHand.module.scss";
import { IProps } from "./types";

export const PlayerHand = ({ cards }: IProps) => {
  const hand = useAppSelector(getUserHand);
  const dispatch = useAppDispatch();

  const points = countPoints(hand);

  useEffect(() => {
    cards.map((card) => {
      dispatch(setUserHand(card));
    });
    dispatch(setUserPoints(points));
  }, [cards, points]);

  return (
    <div className={styles.hand}>
      <div className={styles.container}>
        {hand.map((card) => (
          <Card key={card.code} card={card} />
        ))}
      </div>
    </div>
  );
};

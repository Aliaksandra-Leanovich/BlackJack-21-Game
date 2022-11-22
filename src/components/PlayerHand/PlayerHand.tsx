import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getUserHand } from "../../store/selectors/userSelector";
import { setUserHand, setUserPoints } from "../../store/slices/userSlices";
import { ICard } from "../../store/types";
import { countPoints } from "../GameStart/count";

interface IProps {
  cards: ICard[];
}

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
    <div>
      <div style={{ display: "flex" }}>
        {hand.map((card) => (
          <li key={card.code}>
            <img src={card.image} alt={card.code} className="card" />
          </li>
        ))}
      </div>
    </div>
  );
};

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserHand } from "../../store/selectors";
import { setUserHand, setUserPoints } from "../../store/slices/userSlices";
import { ICard } from "../../store/types";
import { countPoints } from "../Game/countPoints";
import "./style.scss";

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
  console.log(hand);

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

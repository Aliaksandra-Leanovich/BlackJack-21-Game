import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getUserHand } from "../../store/selectors/userSelector";
import { setUserHand } from "../../store/slices/userSlices";
import { ICard } from "../../store/types";

interface IProps {
  cards: ICard[];
}

export const PlayerHand = ({ cards }: IProps) => {
  const hand = useAppSelector(getUserHand);
  const dispatch = useAppDispatch();

  useEffect(() => {
    cards.map((card) => {
      dispatch(setUserHand(card));
    });
  }, [cards]);

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

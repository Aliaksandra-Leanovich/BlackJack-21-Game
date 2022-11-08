import { useState } from "react";
import "../../App.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getCards } from "../../store/selectors/cardsSelector";
import { fetchCards } from "../../store/slices/cardsSlice";
import { ICard } from "../../store/types";
import { Button } from "../Button";
import { v4 as uuidv4 } from "uuid";

const GameStart = () => {
  const [allCards, setAllCards] = useState<ICard[]>([]);

  const dispatch = useAppDispatch();
  const { cards } = useAppSelector(getCards);

  const onSubmit = () => {
    dispatch(fetchCards());
    setAllCards(allCards?.concat(cards));
  };

  console.log(cards);

  return (
    <div>
      <Button type="submit" handleClick={onSubmit}>
        New Card
      </Button>

      {allCards?.map((card) => (
        <li key={uuidv4()}>
          <p>{card.value}</p>
          <img src={card.image} alt={card.code} className="card" />
        </li>
      ))}
    </div>
  );
};

export default GameStart;

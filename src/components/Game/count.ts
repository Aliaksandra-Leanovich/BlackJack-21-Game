import { ICard } from "../../store/types";
import { cardsMap } from "../../utils/mapCards";

export const countPoints = (cards: ICard[]) =>
  cards.reduce((acc, elem) => {
    acc += getCardScore(elem);

    return acc;
  }, 0);

export const getCardScore = (card: ICard) => {
  const cardScore: number = cardsMap[card.value as keyof typeof cardsMap];

  if (!cardScore) {
    throw new Error("Invalid card");
  }

  return cardScore;
};

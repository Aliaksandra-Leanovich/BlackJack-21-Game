import { cardsApi } from "../../services/CardsService";
import { ICard } from "../../store/types";
import { getCardScore } from "./countPoints";

export const setDealersHand = async (
  deckId: string,
  initialScore: number
): Promise<number> => {
  const card: ICard[] = await cardsApi.getNewCard(deckId, 1);
  const cardScore = getCardScore(card[0]);

  const actualScore = +cardScore + initialScore;

  if (actualScore < 21) {
    return setDealersHand(deckId, actualScore);
  }

  return actualScore;
};

export const setDealersPoints = (deckId: string) => {
  return setDealersHand(deckId, 0);
};

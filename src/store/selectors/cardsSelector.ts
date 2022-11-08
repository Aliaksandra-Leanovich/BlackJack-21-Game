import { RootState } from "../store";

export const getCards = (state: RootState) => state.cards;
export const getCardsStatus = (state: RootState) => state.cards.status;

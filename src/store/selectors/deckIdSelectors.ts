import { RootState } from "../store";

export const getDeckId = (state: RootState) => state.deckId;
export const getDeckIdStatus = (state: RootState) => state.deckId.status;

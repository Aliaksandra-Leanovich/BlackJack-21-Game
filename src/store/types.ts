export interface ICard {
  code: string;
  image: string;
  images: {};
  suit: string;
  value: string;
}
export interface ICardsApi {
  cards: ICard[];
  deck_id: "string";
  remaining: number;
  success: boolean;
}
export type RequestStatusType = "idle" | "loading" | "success" | "error";

export interface UsersState {
  cards: ICard[];
  status: RequestStatusType;
}

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
export interface IDeckApi {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export interface IDeckIdState {
  deckId: string;
  status: RequestStatusType;
}
export interface IPlayer {
  name: string;
  id: string;
  points: number;
}

export interface IPlayers {
  players: IPlayer[];
}

export interface IDealer {
  id: number;
  name: string;
  points: number;
}
export interface IUserStore {
  isAuthorized: string | null | void;
  email: string;
  password: string;
  hand: ICard[] | [];
  points: number;
  budget: number;
}

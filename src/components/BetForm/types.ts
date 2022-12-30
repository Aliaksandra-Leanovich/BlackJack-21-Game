import { GameStatus } from "../../enums";

export interface IBetFormProps {
  winner: boolean;
  gameStatus: GameStatus;
  onBetFormSubmit: () => void;
}

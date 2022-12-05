import { GameStatus } from "../Game/types";

export interface IBetFormProps {
  winner: boolean;
  gameStatus: GameStatus;
  onBetFormSubmit: () => void;
}

import "./style.scss";
import { IProps } from "./types";

export const Card = ({ card }: IProps) => {
  return (
    <div key={card.code}>
      <img src={card.image} alt={card.code} className="card" />
    </div>
  );
};

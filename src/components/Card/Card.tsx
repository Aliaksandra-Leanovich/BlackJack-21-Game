import { IProps } from "./types";
import "./style.scss";

export const Card = ({ card }: IProps) => {
  return (
    <div key={card.code}>
      <img src={card.image} alt={card.code} className="card" />
    </div>
  );
};

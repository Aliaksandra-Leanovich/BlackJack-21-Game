import { ICard } from "../../store/types";

export const countPoints = (
  cards: ICard[],
  setPoints: (points: number) => void
) => {
  let points = 0;
  cards.map((card: ICard) => {
    switch (card.value) {
      case "KING":
        points = points + 4;
        break;
      case "ACE":
        points = points + 11;
        break;
      case "JACK":
        points = points + 2;
        break;
      case "QUEEN":
        points = points + 3;
        break;
      default:
        points = +card.value + points;
    }
  });
  setPoints(points);
};

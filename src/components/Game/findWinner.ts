import { useAppSelector } from "../../store/hooks";
import { getPlayers, getUserInfo, getUserPoints } from "../../store/selectors";

const { email } = useAppSelector(getUserInfo);
const { players } = useAppSelector(getPlayers);
const pointsPlayer = useAppSelector(getUserPoints);

export const createArrayOfAllPlayers = () => {
  const player = { name: email, id: "3", points: pointsPlayer };
  const dealer = { name: "dealer", id: "1", points: 0 };
  return [player, dealer, ...players];
};
console.log(createArrayOfAllPlayers());

export const findWinner = () => {
  const players = createArrayOfAllPlayers();
  const sorted = players.sort((a, b) => +a.points - +b.points);
  return sorted;
};

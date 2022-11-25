import { useAppSelector } from "../../store/hooks";
import { getPlayers, getUserInfo, getUserPoints } from "../../store/selectors";
import { v4 as uuidv4 } from "uuid";

// const { email } = useAppSelector(getUserInfo);
// const { players } = useAppSelector(getPlayers);
// const pointsPlayer = useAppSelector(getUserPoints);

// export const createArrayOfAllPlayers = (pointsDealer?: number) => {
//   const player = { name: email, id: uuidv4(), points: pointsPlayer };
//   const dealer = { name: "dealer", id: uuidv4(), points: pointsDealer };
//   return [player, dealer, ...players];
// };
// console.log(createArrayOfAllPlayers());

// export const findWinner = () => {
//   const players = createArrayOfAllPlayers();
//   const sorted = players.sort((a, b) => +a.points - +b.points);
//   return sorted;
// };

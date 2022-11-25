import { useAppSelector } from "../../store/hooks/hooks";
import { getPlayers } from "../../store/selectors/playersSelectors";
import { getUserInfo, getUserPoints } from "../../store/selectors/userSelector";

const { email } = useAppSelector(getUserInfo);
const { players } = useAppSelector(getPlayers);
const pointsPlayer = useAppSelector(getUserPoints);

// export const createArrayOfAllPlayers = (pointsDealer: number) => {
//   const player = { name: email, id: "3", points: pointsPlayer };
//   const dealer = { name: "dealer", id: "1", points: pointsDealer };
//   return [player, dealer, ...players];
// };
// console.log(createArrayOfAllPlayers());

// export const findWinner = () => {
//   const players = createArrayOfAllPlayers();
//   const sorted = players.sort((a, b) => +a.points - +b.points);
//   return sorted;
// };

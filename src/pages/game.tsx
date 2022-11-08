import GameStart from "../components/GameStart/GameStart";
import { useAppSelector } from "../store/hooks/hooks";
import { getCardsStatus } from "../store/selectors/cardsSelector";
import { getUserInfo } from "../store/selectors/userSelector";

const GamePage = () => {
  const { name, budget } = useAppSelector(getUserInfo);
  const status = useAppSelector(getCardsStatus);

  // if (status === "loading") {
  //   return (
  //     <div>
  //       <Spinner />
  //     </div>
  //   );
  // }
  // if (status === "error") {
  //   return <p>502 Service Temporarily Overloaded</p>;
  // }
  return (
    <div>
      <div>
        <p>{name}</p>
        <p>{budget}</p>
      </div>
      <GameStart />
    </div>
  );
};

export default GamePage;

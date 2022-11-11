import GameStart from "../components/GameStart/GameStart";
import { useAppSelector } from "../store/hooks/hooks";
import { getUserInfo } from "../store/selectors/userSelector";

const GamePage = () => {
  const { name, budget } = useAppSelector(getUserInfo);

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

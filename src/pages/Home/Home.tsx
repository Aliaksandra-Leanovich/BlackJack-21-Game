import { Header } from "../../components/Header/Header";
import { Link } from "../../components/Link";
import { Robot } from "../../components/Robot/Robot";
import { routes } from "../../routes/routes";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <>
      <Header />
      <div className={styles.home}>
        <Robot />
        <Link to={routes.BLACKJACK}>Play Game</Link>
      </div>
    </>
  );
};

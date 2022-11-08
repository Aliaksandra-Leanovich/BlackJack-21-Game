import { Route, Routes } from "react-router-dom";
import { MainTemplate } from "../components/MainTemplate/MainTemplate";
import Account from "../pages/account";
import GamePage from "../pages/game";
import HomePage from "../pages/home";
import SignUpPage from "../pages/signup";
import { routes } from "../routes/routes";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<MainTemplate />}>
        <Route path={routes.HOME} element={<HomePage />} />
        <Route path={routes.SIGNUP} element={<SignUpPage />} />
        <Route path={routes.GAME} element={<GamePage />} />
        <Route path={routes.ACCOUNT} element={<Account />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

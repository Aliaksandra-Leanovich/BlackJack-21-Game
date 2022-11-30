import { Route, Routes } from "react-router-dom";
import { MainTemplate } from "../components/MainTemplate/MainTemplate";
import { Account } from "../pages/account";
import { GamePage } from "../pages/game";
import { HomePage } from "../pages/home/home";
import { SignUpPage } from "../pages/signup";
import { routes } from "../routes/routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<MainTemplate />}>
        <Route index element={<HomePage />} />
        <Route path={routes.SIGNUP} element={<SignUpPage />} />
        <Route path={routes.GAME} element={<GamePage />} />
        <Route path={routes.ACCOUNT} element={<Account />} />
      </Route>
    </Routes>
  );
};

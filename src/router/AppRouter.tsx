import { Route, Routes } from "react-router-dom";
import { MainTemplate } from "../components/MainTemplate/MainTemplate";
import { AccountPage } from "../pages/AccountPage";
import { GamePage } from "../pages/GamePage";
import { HomePage } from "../pages/HomePage/HomePage";
import { SignUpPage } from "../pages/SignUpPage";
import { routes } from "../routes/routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<MainTemplate />}>
        <Route index element={<HomePage />} />
        <Route path={routes.SIGNUP} element={<SignUpPage />} />
        <Route path={routes.GAME} element={<GamePage />} />
        <Route path={routes.ACCOUNT} element={<AccountPage />} />
      </Route>
    </Routes>
  );
};

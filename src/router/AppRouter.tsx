import { Route, Routes } from "react-router-dom";
import { MainTemplate } from "../components/MainTemplate/MainTemplate";
import { Account } from "../pages/Account";
import { BlackJack } from "../pages/BlackJack";
import { Home } from "../pages/Home/Home";
import { SignUp } from "../pages/SignUp";
import { routes } from "../routes/routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<MainTemplate />}>
        <Route index element={<Home />} />
        <Route path={routes.SIGNUP} element={<SignUp />} />
        <Route path={routes.BLACKJACK} element={<BlackJack />} />
        <Route path={routes.ACCOUNT} element={<Account />} />
      </Route>
    </Routes>
  );
};

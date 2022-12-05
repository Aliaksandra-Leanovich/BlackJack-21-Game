import { Route, Routes } from "react-router-dom";
import { MainTemplate } from "../components/MainTemplate/MainTemplate";
import { Account } from "../pages/Account";
import { BlackJack } from "../pages/BlackJack";
import { Home } from "../pages/Home/Home";
import { SignUp } from "../pages/SignUp";
import { routes } from "../routes/routes";
import { PrivateRoute } from "../utils/PrivateRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<MainTemplate />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path={routes.BLACKJACK} element={<BlackJack />} />
          <Route path={routes.ACCOUNT} element={<Account />} />
        </Route>

        <Route path={routes.SIGNUP} element={<SignUp />} />
      </Route>
    </Routes>
  );
};

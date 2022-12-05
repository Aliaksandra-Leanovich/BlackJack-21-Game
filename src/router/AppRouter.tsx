import { Navigate, Route, Routes } from "react-router-dom";
import { MainTemplate } from "../components/MainTemplate/MainTemplate";
import { Account } from "../pages/Account";
import { BlackJack } from "../pages/BlackJack";
import { Home } from "../pages/Home/Home";
import { SignIn } from "../pages/SignIn";
import { routes } from "../routes/routes";
import { PrivateRoute } from "../utils/PrivateRoute";
import { useAppSelector } from "../store/hooks";
import { getUserInfo } from "../store/selectors";

export const AppRouter = () => {
  const { isAuthorized } = useAppSelector(getUserInfo);
  return (
    <Routes>
      <Route path={routes.HOME} element={<MainTemplate />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path={routes.BLACKJACK} element={<BlackJack />} />
          <Route path={routes.ACCOUNT} element={<Account />} />
        </Route>

        <Route
          path={routes.SIGNIN}
          element={isAuthorized ? <Navigate to={routes.HOME} /> : <SignIn />}
        />
      </Route>
    </Routes>
  );
};

import { Route, Routes, Navigate } from "react-router-dom";
import { MainTemplate } from "../components/MainTemplate/MainTemplate";
import { Account } from "../pages/Account";
import { BlackJack } from "../pages/BlackJack";
import { Home } from "../pages/Home/Home";
import { SignUp } from "../pages/SignUp";
import { routes } from "../routes/routes";
import { useAppSelector } from "../store/hooks";
import { getUserInfo } from "../store/selectors";

export const AppRouter = () => {
  const { isAuthorized } = useAppSelector(getUserInfo);
  return (
    <Routes>
      <Route path={routes.HOME} element={<MainTemplate />}>
        <Route
          index
          element={!isAuthorized ? <Navigate to={routes.SIGNUP} /> : <Home />}
        />
        <Route path={routes.SIGNUP} element={<SignUp />} />
        <Route
          path={routes.BLACKJACK}
          element={
            !isAuthorized ? <Navigate to={routes.SIGNUP} /> : <BlackJack />
          }
        />
        <Route
          path={routes.ACCOUNT}
          element={
            !isAuthorized ? <Navigate to={routes.SIGNUP} /> : <Account />
          }
        />
      </Route>
    </Routes>
  );
};

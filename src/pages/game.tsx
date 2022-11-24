import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from "../components/Button";
import { GameStart } from "../components/GameStart/GameStart";
import { routes } from "../routes/routes";
import { useAppSelector } from "../store/hooks/hooks";
import { getUserInfo } from "../store/selectors/userSelector";
import { useNavigate } from "react-router-dom";

export const GamePage = () => {
  const { budget } = useAppSelector(getUserInfo);
  const navigate = useNavigate();

  const { isAuthorized } = useAppSelector(getUserInfo);

  const handleBack = () => {
    navigate(-1);
  };

  if (isAuthorized !== null) {
    return (
      <div>
        <div>
          <p>{budget}</p>
          <Button handleClick={handleBack}>Back</Button>
        </div>
        <GameStart />
      </div>
    );
  }
  return <Navigate to={routes.SIGNUP} />;
};

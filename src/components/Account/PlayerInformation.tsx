import React from "react";
import { useAppSelector } from "../../store/hooks";
import { getUserInfo } from "../../store/selectors";

export const PlayerInformation = () => {
  const { email, budget } = useAppSelector(getUserInfo);
  return (
    <div>
      <p>{email}</p>
      <p>{budget}</p>
    </div>
  );
};

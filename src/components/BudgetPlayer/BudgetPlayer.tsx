import React from "react";
import { useAppSelector } from "../../store/hooks/hooks";
import { getUserInfo } from "../../store/selectors/userSelector";

export const BudgetPlayer = () => {
  const { budget } = useAppSelector(getUserInfo);
  return (
    <div>
      <p>{budget}</p>
    </div>
  );
};

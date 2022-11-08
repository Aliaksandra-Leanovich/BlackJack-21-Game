import React from "react";
import { IButton } from "./types";

export const Button = ({
  children,
  type,
  handleClick,
}: React.PropsWithChildren<IButton>) => {
  return (
    <button type={type} onClick={handleClick}>
      {children}
    </button>
  );
};

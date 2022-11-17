import React from "react";
import { IButton } from "./types";

export const Button = ({
  children,
  type,
  disabled,
  handleClick,
}: React.PropsWithChildren<IButton>) => {
  return (
    <button type={type} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

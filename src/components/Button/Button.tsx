import React from "react";
import { IButton } from "./types";

export const Button = ({
  children,
  type,
  className,
  disabled,
  handleClick,
}: React.PropsWithChildren<IButton>) => {
  return (
    <button
      className={className}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

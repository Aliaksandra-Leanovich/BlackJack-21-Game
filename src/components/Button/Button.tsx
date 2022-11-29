import React from "react";
import { IButton } from "./types";
import "./style.scss";

export const Button = ({
  children,
  type,
  className,
  disabled,
  handleClick,
}: React.PropsWithChildren<IButton>) => {
  return (
    <button
      className={`button ${className}`}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

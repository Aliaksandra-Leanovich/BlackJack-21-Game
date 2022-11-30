import React from "react";
import "./style.scss";
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
      className={`button ${className}`}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

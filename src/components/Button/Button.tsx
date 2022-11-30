import React from "react";
import styles from "./Button.module.scss";
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
      className={`${className} ${styles.button}`}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

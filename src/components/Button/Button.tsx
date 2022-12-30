import React from "react";
import styles from "./Button.module.scss";
import { IButton } from "./types";
import { clsx } from "clsx";

export const Button = ({
  children,
  type,
  className,
  handleClick,
}: React.PropsWithChildren<IButton>) => {
  return (
    <button
      className={clsx(styles.button, className)}
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

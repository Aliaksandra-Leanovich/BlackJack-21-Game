import { clsx } from "clsx";
import React from "react";
import styles from "./Link.module.scss";
import { ILinkProps } from "./types";
import { Link as RouterLink } from "react-router-dom";

export const Link = ({
  children,
  className,
  to,
}: React.PropsWithChildren<ILinkProps>) => {
  return (
    <RouterLink to={to} className={clsx(styles.link, className)}>
      {children}
    </RouterLink>
  );
};

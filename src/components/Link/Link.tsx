import { clsx } from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Link.module.scss";
import { ILinkProps } from "./types";

export const LinkTemplate = ({
  children,
  className,
  to,
}: React.PropsWithChildren<ILinkProps>) => {
  return (
    <Link to={to} className={clsx(styles.link, className)}>
      {children}
    </Link>
  );
};

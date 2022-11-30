import React from "react";
import { ILinkProps } from "./types";
import { Link } from "react-router-dom";
import styles from "./Link.module.scss";

export const LinkTemplate = ({
  children,
  className,
  to,
}: React.PropsWithChildren<ILinkProps>) => {
  return (
    <Link to={to} className={`${styles.link} ${className}`}>
      {children}
    </Link>
  );
};

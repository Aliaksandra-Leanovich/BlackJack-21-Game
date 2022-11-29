import React from "react";
import { ILinkProps } from "./types";
import { Link } from "react-router-dom";
import "./style.scss";

export const LinkTemplate = ({
  children,
  className,
  to,
}: React.PropsWithChildren<ILinkProps>) => {
  return (
    <Link to={to} className={`link ${className}`}>
      {children}
    </Link>
  );
};

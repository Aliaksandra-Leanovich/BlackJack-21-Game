import React from "react";
import { ILinkProps } from "./types";
import { Link } from "react-router-dom";

export const LinkTemplate = ({
  children,
  to,
}: React.PropsWithChildren<ILinkProps>) => {
  return <Link to={to}> {children}</Link>;
};

import { Outlet } from "react-router-dom";
import "./style.scss";

export const MainTemplate = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

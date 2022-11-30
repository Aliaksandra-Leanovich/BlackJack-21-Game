import { Outlet } from "react-router-dom";
import styles from "./Maintemplate.module.scss";

export const MainTemplate = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

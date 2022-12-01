import styles from "./Robot.module.scss";
import { clsx } from "clsx";

export const Robot = () => {
  return (
    <div className={clsx(styles.robot, styles.bounce)}>
      <div className={styles.circle}>
        <div className={clsx(styles.ear, styles.left)}></div>
        <div className={styles.head}>
          <div className={styles.face}>
            <div className={clsx(styles.eyes, styles.left)}></div>
            <div className={clsx(styles.eyes, styles.right)}></div>
            <div className={styles.mouth}></div>
          </div>
        </div>
        <div className={clsx(styles.ear, styles.right)}></div>
        <div className={styles.body}></div>
      </div>
    </div>
  );
};

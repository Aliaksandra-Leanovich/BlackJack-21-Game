import styles from "./Robot.module.scss";

export const Robot = () => {
  return (
    <div className={`${styles.robot} ${styles.bounce}`}>
      <div className={styles.circle}>
        <div className={`${styles.robot__ear} ${styles.left}`}></div>
        <div className={styles.robot__head}>
          <div className={styles.robot__face}>
            <div className={`${styles.eyes} ${styles.left}`}></div>
            <div className={`${styles.eyes} ${styles.right}`}></div>
            <div className={styles.mouth}></div>
          </div>
        </div>
        <div className={`${styles.robot__ear} ${styles.right}`}></div>
        <div className={styles.robot__body}></div>
      </div>
    </div>
  );
};

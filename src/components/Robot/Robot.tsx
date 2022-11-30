import styles from "./Robot.module.scss";

export const Robot = () => {
  return (
    <div className={`${styles.robot} ${styles.bounce}`}>
      <div className={styles.circle}>
        <div className={`${styles.ear} ${styles.left}`}></div>
        <div className={styles.head}>
          <div className={styles.face}>
            <div className={`${styles.eyes} ${styles.left}`}></div>
            <div className={`${styles.eyes} ${styles.right}`}></div>
            <div className={styles.mouth}></div>
          </div>
        </div>
        <div className={`${styles.ear} ${styles.right}`}></div>
        <div className={styles.body}></div>
      </div>
    </div>
  );
};

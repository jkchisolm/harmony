import styles from './MePage.module.scss';

export const MePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Me</div>
      <div className={styles.content}>Content</div>
    </div>
  );
};

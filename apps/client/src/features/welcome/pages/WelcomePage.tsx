import styles from './WelcomePage.module.scss';

export const WelcomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <h2>Harmony</h2>
        <h1>IMAGINE A PLACE...</h1>
        <p>
          ...where you can belong to a school club, a gaming group, or a
          worldwide art community. <br /> Where just you and a handful of
          friends can spend time together. A place that makes it easy to talk
          every day and hang out more often.
        </p>
      </div>
    </div>
  );
};

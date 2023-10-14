import styles from './MainLayout.module.scss';

type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <main>{children}</main>
    </div>
  );
};

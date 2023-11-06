import styles from './ServerIcon.module.scss';

type Props = {
  serverName: string;
  serverIcon?: string;
};

export const ServerIcon = ({
  serverName: channelName,
  serverIcon: channelIcon,
}: Props) => {
  return (
    <div className={styles.channelIcon}>
      {channelIcon}
      <div className={styles.serverName}>
        <span>{channelName}</span>
      </div>
    </div>
  );
};

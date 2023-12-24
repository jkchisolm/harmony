import styles from './ServerIcon.module.scss';

type Props = {
  serverId: number;
  serverName: string;
  serverIcon?: string;
};

export const ServerIcon = ({ serverId, serverName, serverIcon }: Props) => {
  const handleClick = () => {
    window.location.href = `/channels/${serverId}`;
  };

  return (
    <div className={styles.channelIcon} onClick={handleClick}>
      {serverIcon}
      <div className={styles.serverName}>
        <span>{serverName}</span>
      </div>
    </div>
  );
};

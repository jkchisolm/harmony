import styles from './ChannelIcon.module.scss';

type Props = {
  channelName: string;
  channelIcon?: string;
};

export const ChannelIcon = ({ channelName, channelIcon }: Props) => {
  return (
    <div className={styles.channelIcon}>
      {channelIcon}
      <div className={styles.serverName}>
        <span>{channelName}</span>
      </div>
    </div>
  );
};

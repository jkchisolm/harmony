// Special version of ChannelIcon for accessing user's messages
import styles from './ChannelIcon.module.scss';
import { FaDiscord } from 'react-icons/fa6';

export const MessagesIcon = () => {
  return (
    <div className={styles.container}>
      <div id={styles.messagesIconBorder} />
      <div className={styles.channelIcon}>
        <FaDiscord size={28} />
        <div className={styles.serverName}>
          <span>Home</span>
        </div>
      </div>
    </div>
  );
};

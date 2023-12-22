import styles from './ServerIcon.module.scss';
import { FaPlus } from 'react-icons/fa6';

export const CreateServerButton = () => {
  return (
    <div className={styles.createChannelIcon}>
      <div id="createServerIcon">
        <FaPlus size={32} />
        <div className={styles.serverName}>
          <span>Add a Server</span>
        </div>
      </div>
    </div>
  );
};

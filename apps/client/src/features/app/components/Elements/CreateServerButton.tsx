import { useState } from 'react';
import styles from './ServerIcon.module.scss';
import { FaPlus } from 'react-icons/fa6';
import { CreateServerModal } from './CreateServerModal';

export const CreateServerButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div
        className={styles.createChannelIcon}
        onClick={() => setModalOpen(true)}
      >
        <FaPlus size={32} />
        <div className={styles.createName}>
          <span>Add a Server</span>
        </div>
      </div>
      {modalOpen && (
        <CreateServerModal
          enabled={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

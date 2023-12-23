import { CreateServerForm } from './CreateServerForm';
import styles from './CreateServerModal.module.scss';

type Props = {
  enabled: boolean;
  onClose: () => void;
};

export const CreateServerModal = ({ enabled, onClose }: Props) => {
  return (
    <div className={styles['modal-container']} onClick={() => onClose()}>
      <div
        className={styles['modal-body']}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className={styles['modal-header']}>Create a server</h1>
        <div className={styles['modal-content']}>
          <CreateServerForm />
        </div>
      </div>
    </div>
  );
};

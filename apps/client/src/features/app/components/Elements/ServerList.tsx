import { ServerIcon, MessagesIcon } from '..';
import { CreateServerButton } from './CreateServerButton';
import styles from './ServerList.module.scss';

type Server = {
  id: number;
  name: string;
  iconURL: string;
};

type Props = {
  servers: Server[];
};

export const ServerList = ({ servers }: Props) => {
  return (
    <div className={styles.serverList}>
      <MessagesIcon />
      {servers.map((server) => {
        return (
          <ServerIcon serverName={server.name} serverIcon={server.name[0]} />
        );
      })}
      <CreateServerButton />
    </div>
  );
};

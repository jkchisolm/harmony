import { useEffect } from 'react';
import styles from './AppLayout.module.scss';
import { useLocation } from 'react-router-dom';
import { DMList } from '../Elements/DMList';
import { useQuery } from '@tanstack/react-query';
import { ServerList } from '../Elements/ServerList';

type Props = {
  children: React.ReactNode;
};

const getServers = async () => {
  const response = await fetch('http://localhost:3000/users/@me/servers', {
    method: 'GET',
    credentials: 'include',
  });

  return response.json();
};

export const AppLayout = ({ children }: Props) => {
  const query = useQuery({
    queryKey: ['getUserServers'],
    queryFn: getServers,
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  });

  const location = useLocation();

  if (query.isFetching) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Oops! Something went wrong.</div>;
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <ServerList servers={query.data} />
      </nav>
      <div className={styles.content}>
        <div className={styles.channelList}>
          {location.pathname.startsWith('/channels/@me') ? (
            <DMList />
          ) : (
            <div>channels</div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

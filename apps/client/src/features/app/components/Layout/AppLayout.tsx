import { useEffect } from 'react';
import styles from './AppLayout.module.scss';
import { ServerIcon } from '..';
import { MessagesIcon } from '../MessagesIcon';
import { useLocation } from 'react-router-dom';
import { DMList } from '../DMList';
import { useQuery } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

const dummyChannels = [
  {
    id: '1',
    name: 'General',
    description: 'General chat for the server',
    members: [
      {
        id: '1',
        username: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: '2',
        username: 'Jane Doe',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
    ],
  },
  {
    id: '2',
    name: 'Gaming',
    description: 'Gaming chat for the server',
    members: [
      {
        id: '1',
        username: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: '2',
        username: 'Jane Doe',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
    ],
  },
  {
    id: '3',
    name: 'Music',
    description: 'Music chat for the server',
    members: [
      {
        id: '1',
        username: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: '2',
        username: 'Jane Doe',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
    ],
  },
];

const getServers = async () => {
  const response = await fetch('http://localhost:3000/servers/user/3', {
    method: 'GET',
    credentials: 'include',
  });

  return response.json();
};

type ServerResponse = {
  id: string;
  name: string;
  description: string;
  members: {
    id: string;
    username: string;
    avatar: string;
  }[];
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

  console.log(query.data);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.serverList}>
          <MessagesIcon />
          {(query.data as ServerResponse[]).map((channel) => {
            return (
              <ServerIcon
                serverName={channel.name}
                serverIcon={channel.name[0]}
              />
            );
          })}
        </div>
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

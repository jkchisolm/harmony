import { useEffect } from 'react';
import styles from './AppLayout.module.scss';
import { ChannelIcon } from '../';

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

export const AppLayout = ({ children }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  });

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.channelList}>
          {dummyChannels.map((channel) => {
            return (
              <ChannelIcon
                channelName={channel.name}
                channelIcon={channel.name[0]}
              />
            );
          })}
        </div>
      </nav>
      MainLayout
      {children}
    </div>
  );
};

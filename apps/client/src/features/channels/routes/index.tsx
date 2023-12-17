import { Outlet, RouteObject } from 'react-router-dom';
import { AppLayout } from '../components';
import { MePage } from '../pages';

export const ChannelRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [{ path: '@me', element: <MePage /> }],
  },
];

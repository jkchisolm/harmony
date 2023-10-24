import { Outlet, RouteObject } from 'react-router-dom';
import { AppLayout } from '../components';

export const ChannelRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [{ path: '@me', element: <div>Home</div> }],
  },
];

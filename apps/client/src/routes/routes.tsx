import { Outlet } from 'react-router-dom';
import { WelcomeRoutes, AuthRoutes, ChannelRoutes } from '../features';
import { AuthGuard } from '../components/Layouts/AuthGuard';

export const AppRouteObject = [
  {
    path: '/',
    element: <Outlet />,
    children: WelcomeRoutes,
  },
  {
    path: '/',
    element: <Outlet />,
    children: AuthRoutes,
  },
  {
    path: '/channels',
    element: (
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    ),
    children: ChannelRoutes,
  },
];

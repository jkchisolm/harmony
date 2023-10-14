import { Outlet } from 'react-router-dom';
import { WelcomeRoutes, AuthRoutes } from '../features';

export const PublicRoutes = [
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
];

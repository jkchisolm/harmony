import { Outlet } from 'react-router-dom';
import { WelcomeRoutes } from '../features';

export const PublicRoutes = [
  {
    path: '/',
    element: <Outlet />,
    children: WelcomeRoutes,
  },
];

import { Outlet, RouteObject } from 'react-router-dom';
import { Register, Login } from '../pages';
import { MainLayout } from '../components';

export const AuthRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
];

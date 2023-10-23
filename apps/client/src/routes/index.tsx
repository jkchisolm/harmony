import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PublicRoutes } from './public';
import { ProtectedRoutes } from './protected';

export const AppRoutes = () => {
  const routes = ProtectedRoutes.concat(PublicRoutes);

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

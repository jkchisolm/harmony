import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRouteObject } from './routes';

export const AppRoutes = () => {
  const routes = AppRouteObject;

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

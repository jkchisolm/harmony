import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PublicRoutes } from './public';

export const AppRoutes = () => {
  const authenticated = false; // Eventually this will be a call to a hook that checks if the user is authenticated

  const routes = authenticated ? [] : PublicRoutes;

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

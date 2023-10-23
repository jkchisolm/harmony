// The only protected route is the channels route. All routes in this file are prefixed with /channels.

import { RouteObject } from 'react-router-dom';

export const ProtectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <div>
        <h1>Protected Routes</h1>
      </div>
    ),
  },
];

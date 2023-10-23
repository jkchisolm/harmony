import { Outlet, RouteObject } from 'react-router-dom';

export const ChannelRoutes: RouteObject[] = [
  {
    path: '',
    element: (
      <div>
        <Outlet />
      </div>
    ),
    children: [{ path: '@me', element: <div>Home</div> }],
  },
];

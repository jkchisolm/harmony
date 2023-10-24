// Layout that checks if user is authenticated. Kicks them to login screen if not, renders an <Outlet/> if they are.

import { useQuery } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

const fetchCurrentUser = async () => {
  const result = await fetch('http://localhost:3000/api/auth/me', {
    method: 'GET',
    credentials: 'include',
  });

  // if result is not ok, throw error
  if (result.status === 401) {
    throw new Error('Unauthorized');
  }

  return result.json();
};

export const AuthGuard = ({ children }: Props) => {
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ['me'],
  //   queryFn: fetchCurrentUser,
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   window.location.href = '/login';
  // }

  return <>{children}</>;
};

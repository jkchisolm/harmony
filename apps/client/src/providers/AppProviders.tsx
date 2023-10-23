import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '../hooks';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const AppProviders = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div>{props.children}</div>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

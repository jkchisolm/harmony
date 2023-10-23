import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const AppProviders = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>{props.children}</div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

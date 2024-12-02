import { QueryClient, useQuery as useReactQuery } from '@tanstack/react-query';

export const queryClient = new QueryClient();
export const queryKeyMap = new Map();

export const useQuery = <T extends Record<string, any>, R>(
  queryFn: (args: T) => Promise<R>,
  options?: {
    variables?: T;
  }
) => {
  const { isLoading: loading, ...result } = useReactQuery({
    queryKey: [...queryKeyMap.get(queryFn), options?.variables ?? {}],
    queryFn: () => (options?.variables ? queryFn(options.variables) : queryFn({} as T)),
  });

  return { loading, ...result };
};

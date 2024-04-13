import { QueryClient } from '@tanstack/react-query'
/**
 * Query client for managing queries with caching and default options.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

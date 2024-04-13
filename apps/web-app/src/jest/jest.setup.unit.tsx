import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'

// Build React Query client provider wrapper

// ✅ creates a new QueryClient for each test
export const queryClientMock = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})
export const createWrapper = () => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClientMock}>{children}</QueryClientProvider>
  )
}

export const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const authenticationHeader = (jwt: string) => {
  return {
    ...defaultHeaders,
    Authorization: `Bearer ${jwt}`
  }
}

export const renderWithQueryProvider = (reactElement: ReactElement) => {
  return {
    ...render(reactElement, { wrapper: createWrapper() })
  }
}

export const mockedPersonDetails = [
  {
    name: 'Winifred Watsica',
    zodiacSign: 'Pisces',
    bio: 'writer, creator, dreamer',
    jobTitle: 'Senior Markets Officer',
    emailId: 'ezekiel84@yahoo.com'
  },
  {
    name: 'Darlene Leffler',
    zodiacSign: 'Cancer',
    bio: 'analysis fan, parent 🇭🇹',
    jobTitle: 'District Infrastructure Administrator',
    emailId: 'trey96@gmail.com'
  }
]

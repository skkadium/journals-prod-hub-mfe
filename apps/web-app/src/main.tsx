import ReactDOM from 'react-dom/client'
import './scss/main.scss'
import AppRoot from './app/AppRoot.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/reactQueryClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AppRoot />
  </QueryClientProvider>
)

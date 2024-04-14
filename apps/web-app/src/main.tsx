import ReactDOM from 'react-dom/client'
import './scss/main.scss'
import AppRoot from './app/AppRoot.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/reactQueryClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppRoot />
    </QueryClientProvider>
  </BrowserRouter>
)

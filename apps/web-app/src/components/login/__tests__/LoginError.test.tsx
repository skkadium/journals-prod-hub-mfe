import { render, screen } from '@testing-library/react'
import { LoginError } from '../LoginError'

describe('components/ui/login/LoginError', () => {
  it('should render the error message provided', async () => {
    const message = 'Error Message'
    render(<LoginError message={message} />)
    expect(screen.getByText(/Sorry,/)).toBeVisible()
    expect(screen.getByText(/Error Message/)).toBeVisible()
  })

  it('should render the error title and message provided', async () => {
    const title = 'Error Title'
    const message = 'Error Message'
    render(<LoginError title={title} message={message} />)
    expect(screen.getByText(/Error Title/)).toBeVisible()
    expect(screen.getByText(/Error Message/)).toBeVisible()
  })
})

import { cleanup, render, screen } from '@testing-library/react'
import { FieldError } from '../FieldError'

describe('components/ui/login/FieldError', () => {
  afterEach(cleanup)
  it('Should render a field error', () => {
    const errorMsg = 'An error'
    render(<FieldError error={errorMsg} />)

    expect(screen.getByText(/An error/)).toBeVisible()
  })

  it('Should render nothing on no error property', () => {
    const { container } = render(<FieldError />)

    expect(container.childElementCount).toBe(0)
  })

  it('Should render nothing on empty string error property', () => {
    const { container } = render(<FieldError error="" />)

    expect(container.childElementCount).toBe(0)
  })
})

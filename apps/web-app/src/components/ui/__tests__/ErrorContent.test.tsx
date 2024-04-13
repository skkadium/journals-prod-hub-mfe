import { cleanup, render, screen } from '@testing-library/react'
import ErrorContent from '../ErrorContent'

describe('components/ui/ErrorContent', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = render(<ErrorContent>test</ErrorContent>).container
  })
  afterEach(cleanup)

  it('should render an error', () => {
    const errorContent = container.getElementsByClassName('c-error')
    expect(errorContent).toHaveLength(1)
  })

  it("should render it's children", () => {
    expect(screen.getByText(/test/)).toBeVisible()
  })
})

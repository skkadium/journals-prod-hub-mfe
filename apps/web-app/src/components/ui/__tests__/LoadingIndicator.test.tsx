import { render } from '@testing-library/react'
import LoadingIndicator from '../LoadingIndicator'

describe('components/ui/LoadingIndicator', () => {
  it('should render a loading indicator', () => {
    const { container } = render(<LoadingIndicator />)
    const loadingIndicator = container.getElementsByClassName('c-loading-indicator')
    expect(loadingIndicator).toHaveLength(1)
  })
})

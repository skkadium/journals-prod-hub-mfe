import { act, render } from '@testing-library/react'
import HelpButton from '../HelpButton'

describe('components/ui/HelpButton', () => {
  it('should render button with color', async () => {
    const { container } = await act(async () => render(<HelpButton color="blue" />))

    const spans = container.querySelectorAll('span')

    // Assert
    expect(spans.item(0).title).toBe('Open Help')
  })
})

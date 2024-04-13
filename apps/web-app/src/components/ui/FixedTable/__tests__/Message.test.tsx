import { cleanup, render, screen } from '@testing-library/react'
import { Message } from '../Message'

describe('components/ui/FixedTable/Message', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = render(<Message>test</Message>).container
  })
  afterEach(cleanup)

  it('should render the table message', () => {
    const tableMessage = container.getElementsByClassName('c-fixed-table__message')
    expect(tableMessage).toHaveLength(1)
  })

  it("should render it's children", () => {
    expect(screen.getByText(/test/)).toBeVisible()
  })
})

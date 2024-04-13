import { cleanup, render, screen } from '@testing-library/react'
import { Body } from '../Body'

describe('components/ui/FixedTable/Body', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = render(
      <Body>
        <span id="test" />
      </Body>
    ).container
  })
  afterEach(cleanup)

  it('should render the table body', () => {
    const tableBody = container.getElementsByClassName('c-fixed-table__body')
    expect(tableBody).toHaveLength(1)
    expect(screen.getByRole('rowgroup')).toBeVisible()
  })

  it("should render it's children", () => {
    const spanElement = container.querySelector('#test')
    expect(spanElement).toBeInTheDocument()
  })
})

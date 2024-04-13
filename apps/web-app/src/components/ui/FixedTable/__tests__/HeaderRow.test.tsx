import { cleanup, render, screen } from '@testing-library/react'
import { HeaderRow } from '../HeaderRow'

describe('components/ui/FixedTable/HeaderRow', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = render(
      <HeaderRow>
        <span id="test" />
      </HeaderRow>
    ).container
  })
  afterEach(cleanup)

  it('should render the table header row', () => {
    const headerRow = container.getElementsByClassName('c-fixed-table__header-row')
    expect(headerRow).toHaveLength(1)
    expect(screen.getByRole('row')).toBeVisible()
  })

  it("should render it's children", () => {
    const spanElement = container.querySelector('#test')
    expect(spanElement).toBeInTheDocument()
  })
})

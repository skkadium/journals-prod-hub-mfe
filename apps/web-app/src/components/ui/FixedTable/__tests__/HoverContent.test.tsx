import { cleanup, render } from '@testing-library/react'
import { HoverContent } from '../HoverContent'

describe('components/ui/FixedTable/HoverContent', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = render(
      <HoverContent>
        <span id="test" />
      </HoverContent>
    ).container
  })
  afterEach(cleanup)

  it('should render the table active content', () => {
    const tableHeader = container.getElementsByClassName('c-fixed-table__hover-content')
    expect(tableHeader).toHaveLength(1)
  })

  it("should render it's children", () => {
    const spanElement = container.querySelector('#test')
    expect(spanElement).toBeInTheDocument()
  })
})

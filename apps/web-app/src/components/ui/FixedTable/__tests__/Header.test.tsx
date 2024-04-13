import { cleanup, render } from '@testing-library/react'
import { Header } from '../Header'

describe('modules/ui/FixedTable/Header', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = render(
      <Header>
        <span id="test" />
      </Header>
    ).container
  })
  afterEach(cleanup)

  it('should render the table header', () => {
    const tableHeader = container.getElementsByClassName('c-fixed-table__header')
    expect(tableHeader).toHaveLength(1)
  })

  it("should render it's children", () => {
    const spanElement = container.querySelector('#test')
    expect(spanElement).toBeInTheDocument()
  })
})

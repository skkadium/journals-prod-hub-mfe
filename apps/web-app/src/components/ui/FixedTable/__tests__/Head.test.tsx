import { cleanup, render, screen } from '@testing-library/react'
import { Head } from '../Head'

describe('components/ui/FixedTable/Head', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = render(
      <Head>
        <span id="test" />
      </Head>
    ).container
  })
  afterEach(cleanup)

  it('should render the table head', () => {
    const tableHead = container.getElementsByClassName('c-fixed-table__head')
    expect(tableHead).toHaveLength(1)
    expect(screen.getByRole('rowgroup')).toBeVisible()
  })

  it("should render it's children", () => {
    const spanElement = container.querySelector('#test')
    expect(spanElement).toBeInTheDocument()
  })
})

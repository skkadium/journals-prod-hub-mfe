import { cleanup, render, screen } from '@testing-library/react'
import { Grid } from '../Grid'

describe('components/ui/FixedTable/Grid', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = render(
      <Grid>
        <span id="test" />
      </Grid>
    ).container
  })

  afterEach(cleanup)

  it('should render the table grid', () => {
    const tableGrid = container.getElementsByClassName('c-fixed-table__grid')
    expect(tableGrid).toHaveLength(1)
    expect(screen.getByRole('grid')).toBeVisible()
  })

  it("should render it's children", () => {
    const spanElement = container.querySelector('#test')
    expect(spanElement).toBeInTheDocument()
  })
})

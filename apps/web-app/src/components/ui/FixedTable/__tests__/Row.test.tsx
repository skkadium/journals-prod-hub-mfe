import { cleanup, render, screen } from '@testing-library/react'
import { Row } from '../Row'

describe('components/ui/FixedTable/Row', () => {
  afterEach(cleanup)
  it('should render the table row', () => {
    const { container } = render(
      <Row>
        <span id="test" />
      </Row>
    )
    const tableRow = container.getElementsByClassName('c-fixed-table__row')
    expect(tableRow).toHaveLength(1)
    expect(screen.getByRole('row')).toBeVisible()
  })

  it('should apply .is-expanded when expanded', () => {
    const { container } = render(
      <Row expanded>
        <span id="test" />
      </Row>
    )
    const tableRow = container.getElementsByClassName('is-expanded')
    expect(tableRow).toHaveLength(1)
    expect(screen.getByRole('row')).toHaveClass('is-expanded')
  })

  it('should not apply .is-expanded when not expanded', () => {
    const { container } = render(
      <Row>
        <span id="test" />
      </Row>
    )
    const tableRow = container.getElementsByClassName('is-expanded')
    expect(tableRow).toHaveLength(0)
    expect(screen.getByRole('row')).not.toHaveClass('is-expanded')
  })

  it('should apply .is-bordered when bordered', () => {
    const { container } = render(
      <Row bordered>
        <span id="test" />
      </Row>
    )
    const tableRow = container.getElementsByClassName('is-bordered')
    expect(tableRow).toHaveLength(1)
    expect(screen.getByRole('row')).toHaveClass('is-bordered')
  })

  it('should not apply .is-bordered when not bordered', () => {
    const { container } = render(
      <Row>
        <span id="test" />
      </Row>
    )
    const tableRow = container.getElementsByClassName('is-bordered')
    expect(tableRow).toHaveLength(0)
    expect(screen.getByRole('row')).not.toHaveClass('is-bordered')
  })
})

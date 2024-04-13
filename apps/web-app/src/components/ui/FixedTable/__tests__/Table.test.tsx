import { cleanup, render } from '@testing-library/react'
import { Table } from '../Table'

describe('components/ui/FixedTable/Table', () => {
  describe('rendering without custom class name', () => {
    let container: HTMLElement

    beforeEach(() => {
      container = render(
        <Table dragging label="test table">
          <span id="test" />
        </Table>
      ).container
    })
    afterEach(cleanup)

    it('should render the table', () => {
      const table = container.getElementsByClassName('c-fixed-table')
      expect(table).toHaveLength(1)
    })

    it('should render its children', () => {
      const spanElement = container.querySelector('#test')
      expect(spanElement).toBeInTheDocument()
    })

    it('should apply the label', () => {
      const table = container.getElementsByClassName('c-fixed-table')
      expect(table.item(0)).toHaveAttribute('aria-label', 'test table')
    })

    it('should apply the dragging modifier', () => {
      const table = container.getElementsByClassName('c-fixed-table')
      expect(table.item(0)).toHaveClass('is-dragging')
    })
  })

  describe('rendering with custom class name', () => {
    it('should apply custom class name to rendered table', () => {
      const { container } = render(
        <Table label="label" className="special-class">
          <span />
        </Table>
      )
      const table = container.getElementsByClassName('c-fixed-table')
      expect(table.item(0)).toHaveClass('special-class')
    })

    it('should apply custom class name in addition to class name added for dragging', () => {
      const { container } = render(
        <Table label="label" className="special-class" dragging>
          <span />
        </Table>
      )
      const table = container.getElementsByClassName('c-fixed-table')
      expect(table.item(0)).toHaveClass('special-class')
      expect(table.item(0)).toHaveClass('is-dragging')
    })
  })
})

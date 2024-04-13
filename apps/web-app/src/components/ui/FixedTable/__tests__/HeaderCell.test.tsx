import { cleanup, render, screen } from '@testing-library/react'
import { HeaderCell } from '../HeaderCell'

describe('components/ui/FixedTable/HeaderCell', () => {
  afterEach(cleanup)
  describe('with optional properties', () => {
    let container: HTMLElement

    beforeEach(() => {
      container = render(
        <HeaderCell width="1rem" className="myClass">
          <span id="test" />
        </HeaderCell>
      ).container
    })

    it('should render the table header cell', () => {
      const tableCell = container.getElementsByClassName('c-fixed-table__header-cell')
      expect(tableCell).toHaveLength(1)
      expect(screen.getByRole('columnHeader')).toBeVisible()
    })

    it("should render it's children", () => {
      const spanElement = container.querySelector('#test')
      expect(spanElement).toBeInTheDocument()
    })

    it('should apply the width', () => {
      expect(screen.getByRole('columnHeader')).toHaveStyle(`width: 1rem`)
    })

    it('should apply className', () => {
      expect(screen.getByRole('columnHeader')).toHaveClass('myClass')
    })
  })

  describe('without optional properties', () => {
    beforeEach(() => {
      render(
        <HeaderCell>
          <span id="test" />
        </HeaderCell>
      )
    })

    it('should have no style property if width not specified', () => {
      expect(screen.getByRole('columnHeader').hasAttribute('style')).toBeFalsy()
    })

    it('should have no additional classes if no className specified', () => {
      expect(screen.getByRole('columnHeader').className).toBe('c-fixed-table__header-cell')
    })
  })
})

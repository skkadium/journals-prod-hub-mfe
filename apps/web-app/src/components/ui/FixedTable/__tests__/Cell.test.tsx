import { cleanup, render, screen } from '@testing-library/react'
import { Cell } from '../Cell'

describe('components/ui/FixedTable/Cell', () => {
  afterEach(cleanup)
  describe('with optional properties', () => {
    let container: HTMLElement

    beforeEach(() => {
      container = render(
        <Cell width="1rem" className="myClass">
          <span id="test" />
        </Cell>
      ).container
    })

    it('should render the table cell', () => {
      const tableCell = container.getElementsByClassName('c-fixed-table__cell')
      expect(tableCell).toHaveLength(1)
      expect(screen.getByRole('cell')).toBeVisible()
    })

    it("should render it's children", () => {
      const spanElement = container.querySelector('#test')
      expect(spanElement).toBeInTheDocument()
    })

    it('should apply the width', () => {
      expect(screen.getByRole('cell')).toHaveStyle(`width: 1rem`)
    })

    it('should apply className', () => {
      expect(screen.getByRole('cell')).toHaveClass('myClass')
    })
  })

  describe('without optional properties', () => {
    beforeEach(() => {
      render(
        <Cell>
          <span id="test" />
        </Cell>
      )
    })

    it('should have no style property if width not specified', () => {
      expect(screen.getByRole('cell').hasAttribute('style')).toBeFalsy()
    })

    it('should have no additional classes if no className specified', () => {
      expect(screen.getByRole('cell').className).toBe('c-fixed-table__cell')
    })
  })
})

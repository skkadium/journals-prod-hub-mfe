import { act, render } from '@testing-library/react'
import Toolbar from '../Toolbar'

describe('components/toolbar/Toolbar.header', () => {
  describe('rendering tests', () => {
    it('should display the PPE Web Application heading in the toolbar', async () => {
      // Act
      const { container } = await act(async () => render(<Toolbar />))

      // Assert
      const toolBarHeader = container.getElementsByClassName('c-toolbar-header')
      expect(toolBarHeader).toHaveLength(1)
      expect(toolBarHeader.item(0)).toHaveTextContent('PPE Web Application')
    })

    it('should display the help icon link toolbar', async () => {
      // Act
      const { container } = await act(async () => render(<Toolbar />))

      const spans = container.querySelectorAll('span')

      // Assert
      expect(spans.item(0).title).toBe('Open Help')
    })
  })
})

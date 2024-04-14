import { fireEvent, render, screen } from '@testing-library/react'
import { Toolbar } from '../Toolbar'
import useUserStore from '../../../store/user/userStore'
import { useLogout } from '../../../hooks/useLogout'

jest.mock('../../../hooks/useLogout')
const useLogoutMock = useLogout as jest.Mock

describe('components/toolbar/Toolbar.header', () => {
  const logoutFn = jest.fn()
  describe('rendering tests', () => {
    const initialUserStore = useUserStore.getState()
    beforeEach(() => {
      useLogoutMock.mockImplementation(() => ({
        onLogout: logoutFn
      }))
      useUserStore.setState(initialUserStore, true)
    })

    it('should display the Journals Production Hub heading in the toolbar', () => {
      // Act
      const { container } = render(<Toolbar />)

      // Assert
      const toolBarHeader = container.getElementsByClassName('c-toolbar-header')
      expect(toolBarHeader).toHaveLength(1)
      expect(toolBarHeader.item(0)).toHaveTextContent('Journals Production Hub')
    })

    it('should display the help icon link toolbar', async () => {
      // Act
      render(<Toolbar />)

      // Assert
      const helpBtn = await screen.findByTitle('Open Help')
      expect(helpBtn).toBeVisible()
      expect(helpBtn).toHaveAttribute('title', 'Open Help')
    })

    it('should display the logout button in the toolbar', async () => {
      // Act
      render(<Toolbar showLogout />)

      // Assert
      const logOutBtn = await screen.findByTitle('Log out')
      expect(logOutBtn).toBeVisible()
      expect(logOutBtn).toHaveAttribute('title', 'Log out')
    })

    it('should call logout function on click', async () => {
      // Act
      render(<Toolbar showLogout />)

      const logOutBtn = await screen.findByTitle('Log out')

      fireEvent.click(logOutBtn)

      expect(logoutFn).toHaveBeenCalled()
    })

    it('should display Issues dropdown', () => {
      render(<Toolbar showNavItems />)
      expect(screen.getByText('Issues')).toBeInTheDocument()
    })
  })
})

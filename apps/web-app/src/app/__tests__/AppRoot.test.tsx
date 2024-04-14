import { cleanup, screen, waitFor } from '@testing-library/react'
import { JOURNAL_MANAGER_JWT_ENC, NON_JOURNAL_MANAGER_JWT_ENC } from '../../utils/jwt'
import AppRoot from '../AppRoot'
import { renderWithQueryProvider } from '../../jest/jest.setup.unit'
import { useLogout } from '../../hooks/useLogout'
import { useRefreshTokenQuery } from '../../hooks/useRefreshJwt'

const renderApp = () => renderWithQueryProvider(<AppRoot />)

jest.mock('../../hooks/useLogout')
jest.mock('../../hooks/useRefreshJwt')

const useRefreshTokenQueryMock = useRefreshTokenQuery as jest.Mock
const useLogoutMock = useLogout as jest.Mock

describe('app/AppRoot', () => {
  beforeEach(() => {
    localStorage.clear()
    useLogoutMock.mockImplementation(() => ({
      onLogout: jest.fn()
    }))
  })

  afterEach(cleanup)

  it('should render login when stored JWT has expired', async () => {
    // Arrange
    const ppeJwt = JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)
    useRefreshTokenQueryMock.mockImplementation(() => ({
      isSuccess: false,
      isError: true,
      error: { response: { data: { errorType: 'LOGIN_REQUIRED' } } }
    }))

    // Act
    const { container } = renderApp()

    // Assert
    const headings = container.querySelectorAll('h2')
    const subtitle = screen.getByText(/Use your organisation account details to sign in./)
    const userIdInput = screen.getByLabelText(/User ID/)
    const passwordInput = screen.getByLabelText(/Password/)
    const signInButton = screen.getByRole('button', { name: 'Sign in' })

    expect(headings).toHaveLength(2)
    expect(headings.item(0).textContent).toEqual('Journals Production Hub')
    expect(headings.item(1).textContent).toEqual('Sign in')
    expect(subtitle).toBeVisible()

    expect(userIdInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(signInButton).toBeVisible()
    expect(signInButton.getAttribute('disabled')).toBe('')
  })

  it('should render application when stored JWT is valid', async () => {
    // Arrange
    const ppeJwt = JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)

    const newPpeJwt = JOURNAL_MANAGER_JWT_ENC

    useRefreshTokenQueryMock.mockImplementation(() => ({
      isSuccess: true,
      data: { jwt: newPpeJwt }
    }))

    // Act
    const { container } = renderApp()

    // Assert
    const heading = container.querySelector('h2')

    expect(heading).toHaveTextContent('Journals Production Hub')
    await waitFor(() => {
      expect(screen.getByTitle('Log out')).toBeVisible()
    })
  })

  it("should render LoginError when stored JWT doesn't contain role", async () => {
    // Arrange
    const ppeJwt = NON_JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)

    useRefreshTokenQueryMock.mockImplementation(() => ({
      isSuccess: true,
      data: { jwt: NON_JOURNAL_MANAGER_JWT_ENC }
    }))

    // Act
    const { container } = renderApp()

    // Assert
    const heading = container.querySelector('h2')
    const unAuthorizedErrorContent = container.getElementsByClassName('c-unauthorised__content')

    expect(heading).toHaveTextContent('Journals Production Hub')
    expect(unAuthorizedErrorContent.item(0)?.childNodes[0]).toHaveTextContent('Sorry,')
    expect(unAuthorizedErrorContent.item(0)?.childNodes[1]).toHaveTextContent(
      'You do not have permission to use this feature.'
    )
    expect(unAuthorizedErrorContent.item(0)?.childNodes[2].nodeName).toBe('HR')
    expect(unAuthorizedErrorContent.item(0)?.childNodes[3]).toHaveTextContent(
      'Please refer to PPE procedures for guidance on accessing this application.'
    )
  })
})

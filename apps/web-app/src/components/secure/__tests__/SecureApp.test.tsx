import { render, waitFor } from '@testing-library/react'
import { SecureApp } from '../SecureApp'
import { JOURNAL_MANAGER_JWT_ENC, NON_JOURNAL_MANAGER_JWT_ENC } from '../../../utils/jwt'
import { config } from '@repo/app-config'
import { SecureStates } from '../../../constants'
import { useRefreshTokenQuery } from '../../../hooks/useRefreshJwt'

jest.mock('../../../hooks/useRefreshJwt')
const useRefreshTokenQueryMock = useRefreshTokenQuery as jest.Mock

describe('components/secure/SecureApp', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true })
    localStorage.clear()
  })
  afterEach(() => {
    jest.clearAllTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })

  it('should not render anything while it is working', () => {
    // Arrange
    const renderPropMock = jest.fn()
    renderPropMock.mockReturnValueOnce(null)
    useRefreshTokenQueryMock.mockImplementation(() => ({
      isSuccess: false,
      isError: false
    }))

    // Act
    render(<SecureApp>{renderPropMock}</SecureApp>)

    // Assert
    expect(renderPropMock).not.toHaveBeenCalled()
  })

  it('should inject an authenticated state into the render prop function if the ppe jwt stored is valid', async () => {
    // Arrange
    const ppeJwt = JOURNAL_MANAGER_JWT_ENC
    const newPpeJwt = JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)

    const renderPropMock = jest.fn()
    renderPropMock.mockReturnValueOnce(null)
    useRefreshTokenQueryMock.mockImplementation(() => ({
      isSuccess: true,
      data: { jwt: newPpeJwt }
    }))

    // Act
    render(<SecureApp>{renderPropMock}</SecureApp>)

    // Assert
    expect(renderPropMock).toHaveBeenCalledWith({
      secureState: SecureStates.AUTHENTICATED
    })
  })

  it('should inject an unauthorised state into the render prop function and not store the new ppeJwt if the ppeJwt does hold the correct role', async () => {
    // Arrange
    const ppeJwt = NON_JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)
    const newPpeJwt = NON_JOURNAL_MANAGER_JWT_ENC

    useRefreshTokenQueryMock.mockImplementation(() => ({
      isSuccess: true,
      data: { jwt: newPpeJwt }
    }))

    const renderPropMock = jest.fn()
    renderPropMock.mockReturnValueOnce(null)

    // Act
    render(<SecureApp>{renderPropMock}</SecureApp>)

    // Assert
    expect(renderPropMock).toHaveBeenCalledWith({
      secureState: SecureStates.UNAUTHORISED
    })
  })

  it('refresh function should call refresh endpoint and set the timeout function in the state', async () => {
    // Arrange
    const ppeJwt = JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)
    const newPpeJwt = JOURNAL_MANAGER_JWT_ENC

    useRefreshTokenQueryMock.mockImplementation(() => ({
      isSuccess: true,
      data: { jwt: newPpeJwt }
    }))

    const renderPropMock = jest.fn()
    renderPropMock.mockReturnValue(null)

    // Act
    render(<SecureApp>{renderPropMock}</SecureApp>)

    // Assert
    expect(setTimeout).toHaveBeenCalled()
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), config.auth.interval)
    expect(renderPropMock).toHaveBeenCalledWith({
      secureState: SecureStates.AUTHENTICATED
    })

    jest.advanceTimersByTime(config.auth.interval * 1.5)

    // setTimeout has been called twice now because the refresh was successful so another setTimeout was called
    waitFor(() => expect(setTimeout).toHaveBeenCalledTimes(2))
    expect(renderPropMock).toHaveBeenCalledWith({
      secureState: SecureStates.AUTHENTICATED
    })
  })

  it('refresh function should call refresh endpoint which fails and sets login required state', async () => {
    // Arrange
    const ppeJwt = JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)

    useRefreshTokenQueryMock.mockImplementation(() => ({
      isSuccess: false,
      isError: true,
      error: { response: { data: { errorType: 'LOGIN_REQUIRED' } } }
    }))

    const renderPropMock = jest.fn()
    renderPropMock.mockReturnValue(null)

    // Act
    render(<SecureApp>{renderPropMock}</SecureApp>)

    // Assert
    expect(renderPropMock).toHaveBeenCalledWith({
      secureState: SecureStates.LOGIN_REQUIRED
    })
  })
})

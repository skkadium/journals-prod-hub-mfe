import { useQuery } from '@tanstack/react-query'
import { JOURNAL_MANAGER_JWT_ENC, NON_JOURNAL_MANAGER_JWT_ENC } from '../../utils/jwt'
import { renderHook } from '@testing-library/react'
import { useSecureStates } from '../useSecureStates'
import { createWrapper } from '../../jest/jest.setup.unit'
import { SecureStates } from '../../constants'

jest.mock('@tanstack/react-query')
const useQueryMock = useQuery as jest.Mock

describe('hooks/useSecureState', () => {
  it('should set secure state as AUTHENTICATED', async () => {
    // Arrange
    const ppeJwt = JOURNAL_MANAGER_JWT_ENC
    const ppeNewJwt = JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)

    useQueryMock.mockReturnValue({ isSuccess: true, data: { jwt: ppeNewJwt } })

    // Act
    const { result } = renderHook(() => useSecureStates(), { wrapper: createWrapper() })

    // Assert
    expect(result.current.secureState).toBe(SecureStates.AUTHENTICATED)
    expect(result.current.working).toBe(false)
  })

  it('should set secure state as LOGIN_REQUIRED', async () => {
    // Arrange
    const ppeJwt = JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)

    useQueryMock.mockReturnValue({
      isSuccess: false,
      isError: true,
      error: { response: { data: { errorType: 'LOGIN_REQUIRED' } } }
    })

    // Act
    const { result } = renderHook(() => useSecureStates(), { wrapper: createWrapper() })

    // Assert
    expect(result.current.secureState).toBe(SecureStates.LOGIN_REQUIRED)
    expect(result.current.working).toBe(false)
  })

  it('should set secure state as UNAUTHORISED', async () => {
    // Arrange
    const ppeJwt = NON_JOURNAL_MANAGER_JWT_ENC
    const ppeNewJwt = NON_JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)

    useQueryMock.mockReturnValue({ isSuccess: true, data: { jwt: ppeNewJwt } })

    // Act
    const { result } = renderHook(() => useSecureStates(), { wrapper: createWrapper() })

    // Assert
    expect(result.current.secureState).toBe(SecureStates.UNAUTHORISED)
    expect(result.current.working).toBe(false)
  })
})

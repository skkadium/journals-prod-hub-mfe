import { useQuery } from '@tanstack/react-query'
import { JOURNAL_MANAGER_JWT_ENC } from '../../utils/jwt'
import { createWrapper } from '../../jest/jest.setup.unit'
import { renderHook } from '@testing-library/react'
import { useRefreshTokenQuery } from '../useRefreshJwt'

jest.mock('@tanstack/react-query')
const useQueryMock = useQuery as jest.Mock

describe('hooks/useRefreshJwt', () => {
  it('should render error type as LOGIN_REQUIRED', async () => {
    // Arrange
    const ppeJwt = JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)

    useQueryMock.mockReturnValue({ isError: true, error: { response: { data: { errorType: 'LOGIN_REQUIRED' } } } })

    // Act
    const { result } = renderHook(() => useRefreshTokenQuery(), { wrapper: createWrapper() })

    // Assert
    expect(result.current.isError).toBe(true)
    expect(result.current.error?.response?.data?.errorType).toBe('LOGIN_REQUIRED')
  })

  it('should render error type as INVALID_JWT', async () => {
    // Arrange
    const ppeJwt = 'invalid'
    localStorage.setItem('ppeJwt', ppeJwt)

    useQueryMock.mockReturnValue({
      isSuccess: false,
      isError: true,
      error: { response: { data: { errorType: 'INVALID_JWT' } } }
    })

    // Act
    const { result } = renderHook(() => useRefreshTokenQuery(), { wrapper: createWrapper() })

    // Assert
    expect(result.current.isError).toBe(true)
    expect(result.current.error?.response?.data?.errorType).toBe('INVALID_JWT')
  })

  it('should render jwt token', async () => {
    // Arrange
    const ppeJwt = JOURNAL_MANAGER_JWT_ENC
    const ppeNewJwt = JOURNAL_MANAGER_JWT_ENC
    localStorage.setItem('ppeJwt', ppeJwt)

    useQueryMock.mockReturnValue({ isSuccess: true, data: { jwt: ppeNewJwt } })

    // Act
    const { result } = renderHook(() => useRefreshTokenQuery(), { wrapper: createWrapper() })

    // Assert
    expect(result.current.isSuccess).toBe(true)
    expect(result.current.data?.jwt).toEqual(ppeNewJwt)
  })
})

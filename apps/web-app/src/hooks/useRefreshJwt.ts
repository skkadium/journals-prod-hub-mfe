import { useQuery } from '@tanstack/react-query'
import authApi, { AuthResponse } from '../api/auth'
import { config } from '@repo/app-config'
import { AxiosError } from 'axios'

/**
 * Represents the error object returned during a refresh operation.
 */
export interface RefreshError {
  errorType?: string
}

/**
 * Asynchronously refreshes the JWT token.
 *
 * @returns {Promise<AuthResponse>} - A promise that resolves to the refreshed token.
 */
const refreshJwt = async () => {
  /** Get the authentication API reference */
  const authApiRef = authApi(config.auth.api.path)

  /** Get the PPE JWT token from local storage */
  const ppeJwt: string = localStorage.getItem('ppeJwt')!

  /** Refresh the PPE JWT token using the authentication API reference */
  const response: AuthResponse = await authApiRef.refreshPpeJwt(ppeJwt)

  /** Return the response */
  return response
}

/**
 * Custom hook for refreshing the token query.
 *
 * @returns {QueryObserverResult<AuthResponse, AxiosError<RefreshError>>} - The result of the token refresh query.
 */
export const useRefreshTokenQuery = () => {
  /** Execute the token refresh query using the useQuery hook */
  return useQuery<AuthResponse, AxiosError<RefreshError>>({
    queryKey: ['refresh'],
    queryFn: refreshJwt,
    refetchOnMount: true
  })
}

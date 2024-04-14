/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { RefreshError, useRefreshTokenQuery } from './useRefreshJwt'
import { SecureStates } from '../constants'
import { clearTimer, triggerTimer, validateRolesAndUpdateLocalStorage } from '../utils/jwtValidator'
import { setActiveUsername, useIsUserLoggedout } from '../store/user/userStore'
import useSecureStore, { setJwtExpirationTimeout, setSecureState, toggleWorking } from '../store/secure/secureStore'
import { AuthResponse } from '../api/auth'
import { AxiosError } from 'axios'
import { JwtTimeout } from '../store/secure/types'

const ERROR_TYPES = ['LOGIN_REQUIRED', 'INVALID_JWT']

/**
 * Validates the token data and sets the secure state based on the authorization status.
 * If authorized, it also sets the active username and starts the JWT expiration timer.
 *
 * @param tokenData - The token data received from the authentication response.
 * @param jwtTimeout - The JWT expiration timeout.
 */
const validateTokenAndSetSecureState = (tokenData: AuthResponse, jwtTimeout: JwtTimeout) => {
  //validate roles and store jwt
  const jwt = tokenData?.jwt
  const { authorised, decodeJwt } = validateRolesAndUpdateLocalStorage(jwt!)
  setSecureState(authorised ? SecureStates.AUTHENTICATED : SecureStates.UNAUTHORISED)
  if (authorised) {
    setActiveUsername(decodeJwt.sub!)
    setJwtExpirationTimeout(triggerTimer(jwtTimeout))
  }
}

/**
 * Resets the secure state to LOGIN_REQUIRED and clears the JWT expiration timer.
 *
 * @param jwtTimeout - The JWT expiration timeout.
 */
const resetSecureState = (jwtTimeout: JwtTimeout) => {
  clearTimer(jwtTimeout)
  setSecureState(SecureStates.LOGIN_REQUIRED)
}

/**
 * Invalidates the secure state, clears the JWT expiration timer, and sets the secure state
 * based on the error type received from the server response.
 *
 * @param jwtTimeout - The JWT expiration timeout.
 * @param error - The Axios error object containing the server response.
 */
const invalidateSecureState = (jwtTimeout: JwtTimeout, error: AxiosError<RefreshError>) => {
  clearTimer(jwtTimeout)
  const errorType = error?.response?.data.errorType ?? ''
  setSecureState(ERROR_TYPES.includes(errorType) ? SecureStates.LOGIN_REQUIRED : SecureStates.REJECTED)
}

/**
 * useSecureStates Hook
 *
 * @description
 * A custom hook that manages the secure states of the application.
 * It handles token validation, setting secure state, and updating the working state.
 *
 * @returns {Object} An object containing the working state and secure state.
 */
export const useSecureStates = () => {
  const { working, jwtTimeout, secureState } = useSecureStore()
  const userLoggedout = useIsUserLoggedout()

  const { isSuccess, isError, data: tokenData, error } = useRefreshTokenQuery()

  /**
   * Updates the secure state based on the success, error, and user logged out status.
   *
   * @param isCancelled - A flag indicating if the update is cancelled.
   */
  const updateSecureState = (isCancelled: boolean) => {
    if (!isCancelled) {
      switch (true) {
        case isSuccess && !userLoggedout:
          validateTokenAndSetSecureState(tokenData, jwtTimeout)
          toggleWorking(false)
          break
        case isError:
          invalidateSecureState(jwtTimeout, error)
          toggleWorking(false)
          break
        case userLoggedout:
          resetSecureState(jwtTimeout)
          break
      }
    }
  }

  useEffect(() => {
    let isCancelled = false
    updateSecureState(isCancelled)
    // Clean up function to avoid race conditions
    return () => {
      isCancelled = true
    }
  }, [isSuccess, isError, userLoggedout])

  return { working, secureState }
}

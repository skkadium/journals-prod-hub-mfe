/**
 * This module provides utility functions related to JWT tokens and timers.
 */

import { jwtDecode, JwtPayload } from 'jwt-decode'
import { config } from '@repo/app-config'
import { queryClient } from '../api/reactQueryClient'
import { JwtTimeout } from '../store/secure/types'

/**
 * Interface representing the payload of a JWT token.
 */
interface TokenPayload extends JwtPayload {
  roles: string[] | []
  featureToggle: string[] | []
}

/**
 * Validates the roles in a JWT token and updates the local storage with the token if authorized.
 *
 * @param token - The JWT token to validate.
 *
 * @returns An object containing the authorization status and the decoded JWT token.
 */
export const validateRolesAndUpdateLocalStorage = (token: string) => {
  // Decode the JWT token
  const decodeJwt = jwtDecode<TokenPayload>(token)

  // Check if the user is authorized based on the roles in the token
  const authorised = decodeJwt.roles.some(role => config.auth.authorisedRoles.includes(role))

  if (authorised) {
    // Update the local storage with the token
    localStorage.setItem('ppeJwt', token)
    return { authorised, decodeJwt }
  }

  // Ensure the user is prompted with login
  localStorage.removeItem('ppeJwt')
  return { authorised, decodeJwt }
}

/**
 * Clears a timer.
 *
 * @param timeout - The timer to clear.
 */
export const clearTimer = (timeout: JwtTimeout) => {
  if (!!timeout && timeout !== null) {
    clearTimeout(timeout)
  }
}

/**
 * Triggers a timer to refresh the token after a specified interval.
 *
 * @param timeout - The current timer, if any.
 *
 * @returns The new timer.
 */
export const triggerTimer = (timeout: JwtTimeout) => {
  // Stop any currently untriggered timeout so we don't end up running multiple ones
  clearTimer(timeout)

  // Set a timer to refresh the token after the interval
  return setTimeout(() => {
    // Invoke the refresh endpoint again
    queryClient.invalidateQueries({ queryKey: ['refresh'] })
  }, config.auth.interval)
}

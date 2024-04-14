/**
 * This module provides a user store and atomic selectors for managing user state.
 * It utilizes the Zustand library for state management.
 *
 * @module UserStore
 */
import { UserState, initialUserState } from './types'
import { create } from 'zustand'

/**
 * Creates a user store using Zustand.
 *
 * @returns {UserState} The initial state of the user store.
 */
const useUserStore = create<UserState>(() => ({
  ...initialUserState
}))

/**
 * Sets the active username in the user store.
 *
 * @param {string} username - The username to set.
 */
export const setActiveUsername = (username: string) => useUserStore.setState({ username })

/**
 * Sets the user roles in the user store.
 *
 * @param {string[]} roles - The roles to set.
 */
export const setUserRoles = (roles: string[]) => useUserStore.setState({ roles })

/**
 * Sets the feature toggles in the user store.
 *
 * @param {string[]} featureToggles - The feature toggles to set.
 */
export const setFeatureToggles = (featureToggles: string[]) => useUserStore.setState({ featureToggles })

/**
 * Sets the user logout status in the user store.
 *
 * @param {boolean} isLoggedOut - The logout status to set.
 */
export const setUserLogout = (isLoggedOut: boolean) => useUserStore.setState({ isLoggedOut })

/**
 * Retrieves the active username from the user store.
 *
 * @returns {string} The active username.
 */
export const useGetUsername = (): string => useUserStore(state => state.username)

/**
 * Checks if the user is logged out based on the user store state.
 *
 * @returns {boolean} A boolean indicating if the user is logged out.
 */
export const useIsUserLoggedout = (): boolean => useUserStore(state => state.isLoggedOut)

export default useUserStore

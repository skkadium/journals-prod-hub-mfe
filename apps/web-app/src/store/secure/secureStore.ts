/**
 * This module provides a secure store for managing state using Zustand library.
 * It utilizes the Zustand library for state management.
 *
 * @module secureStore
 */

import { SecureState, initialState } from './types'
import { create } from 'zustand'

/**
 * Creates a secure store using Zustand.
 *
 * @returns {SecureState} The secure store object.
 */
const useSecureStore = create<SecureState>(() => ({
  ...initialState
}))

/**
 * Sets the value of the `secureState` property in the secure store.
 *
 * @param {string} value - The new value for the `secureState` property.
 */
export const setSecureState = (value: string) => useSecureStore.setState({ secureState: value })

/**
 * Toggles the value of the `working` property in the secure store.
 *
 * @param {boolean} value - The new value for the `working` property.
 */
export const toggleWorking = (value: boolean) => useSecureStore.setState({ working: value })

/**
 * Sets the value of the `jwtTimeout` property in the secure store.
 *
 * @param {NodeJS.Timeout | number | undefined} value - The new value for the `jwtTimeout` property.
 */
export const setJwtExpirationTimeout = (value: NodeJS.Timeout | number | undefined) =>
  useSecureStore.setState({ jwtTimeout: value })

export default useSecureStore

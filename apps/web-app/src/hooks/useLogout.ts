import { config } from '@repo/app-config'
import authApi from '../api/auth'
import { setUserLogout } from '../store/user/userStore'

/**
 * A custom hook that provides a logout function.
 *
 * @returns {object} - An object containing the `onLogout` function.
 */
export const useLogout = () => {
  /**
   * Handles the logout process.
   *
   * @function onLogout
   *
   * @returns {Promise<void>} - A promise that resolves when the logout process is complete.
   */
  const onLogout = async () => {
    // Creates an instance of the `authApi` using the provided authentication API path.
    const auth = authApi(config.auth.api.path)

    // Logs out the user by calling the `logout` method of the `auth` instance.
    await auth.logout(localStorage.getItem('ppeJwt')!)

    // Removes the `ppeJwt` item from the local storage.
    localStorage.removeItem('ppeJwt')

    // Sets the `userLogout` state to `true`.
    setUserLogout(true)
  }
  return { onLogout }
}

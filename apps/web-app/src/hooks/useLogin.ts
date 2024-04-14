import { useState } from 'react'
import authApi, { AuthResponse } from '../api/auth'
import { config } from '@repo/app-config'
import axios from 'axios'

/**
 * This function is responsible for performing the login API request.
 *
 * @param {string} username - The username to be used for authentication.
 * @param {string} password - The password to be used for authentication.
 *
 * @returns {Promise<AuthResponse>} - A promise that resolves to the authentication response.
 */
const loginApi = async (username: string, password: string): Promise<AuthResponse> => {
  const authApiRef = authApi(config.auth.api.path)
  const response: AuthResponse = await authApiRef.login(username, password, '')
  return response
}

/**
 * This function is a custom hook that handles the login functionality.
 *
 * @returns {Object} - An object containing the login failure state and the doLogin function.
 */
export const useLogin = () => {
  const [loginFailure, setLoginFailure] = useState(false)
  const [serverFailure, setServerFailure] = useState(false)

  /**
   * This function is responsible for performing the login operation.
   *
   * @param {string} username - The username to be used for authentication.
   * @param {string} password - The password to be used for authentication.
   *
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating the login success.
   */
  const doLogin = async (username: string, password: string) => {
    try {
      const { jwt } = await loginApi(username, password)
      localStorage.setItem('ppeJwt', jwt!)
      doWindowReload()
      return true
    } catch (error) {
      axios.isAxiosError(error) && error.response?.status === 500
        ? setServerFailure(true)
        : // Resets to display default error message
          setServerFailure(false)
      setLoginFailure(true)
    }
    return false
  }

  /**
   * This function is responsible for reloading the window.
   */
  const doWindowReload = () => {
    window.location.reload()
  }

  return { loginFailure, serverFailure, doLogin }
}

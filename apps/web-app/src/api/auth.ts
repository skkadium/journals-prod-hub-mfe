import axios, { AxiosResponse } from 'axios'
import { AUTHORISE_PTS_USER_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT, REFRESH_PPE_JWT_ENDPOINT } from '../constants'

/**
 * Represents the response object returned by the authentication API.
 */
export interface AuthResponse {
  jwt?: string | null // The JWT token returned by the API.
  errorType?: string // The type of error, if any.
}

/**
 * Represents the authentication API.
 */
interface AuthApi {
  /**
   * Authorizes a PTS user.
   *
   * @param ptsJwt - The PTS JWT token.
   * @returns {Promise<AxiosResponse>} - A promise that resolves to the Axios response.
   */
  authorisePtsUser: (ptsJwt: string) => Promise<AxiosResponse>

  /**
   * Refreshes the PPE JWT token.
   *
   * @param ppeJwt - The PPE JWT token.
   * @returns {Promise<AuthResponse>} - A promise that resolves to the authentication response.
   */
  refreshPpeJwt: (ppeJwt: string) => Promise<AuthResponse>

  /**
   * Logs in a user.
   *
   * @param username - The username.
   * @param password - The password.
   * @param jwt - The JWT token.
   * @returns {Promise<AuthResponse>} - A promise that resolves to the authentication response.
   */
  login: (username: string, password: string, jwt: string) => Promise<AuthResponse>

  /**
   * Logs out a user.
   *
   * @param ppeJwt - The PPE JWT token.
   * @returns {Promise<void>} - A promise that resolves when the user is logged out.
   */
  logout: (ppeJwt: string) => Promise<void>
}

/**
 * Creates a function that allows a PTS user.
 *
 * @param apiPath - The API path.
 * @returns {Promise<AxiosResponse>} - A promise that resolves to the Axios response.
 */
const allowPtsUser = (apiPath: string) => {
  return async (ptsJwt: string): Promise<AxiosResponse> => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(ptsJwt && { Authorization: `Bearer ${ptsJwt}` })
    }
    const { data } = await axios.post(`${apiPath}/${AUTHORISE_PTS_USER_ENDPOINT}`, undefined, { headers })

    return data
  }
}

/**
 * Creates a function that refreshes the PPE JWT token.
 *
 * @param apiPath - The API path.
 * @returns {Promise<AuthResponse>} - A promise that resolves to the authentication response.
 */
const refreshPpeToken = (apiPath: string) => {
  return async (ppeJwt: string): Promise<AuthResponse> => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ppeJwt}`
    }
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${apiPath}/${REFRESH_PPE_JWT_ENDPOINT}`,
      undefined,
      { headers }
    )

    return response.data
  }
}

/**
 * Creates a function that signs in a user.
 *
 * @param apiPath - The API path.
 * @returns {Promise<AuthResponse>} - A promise that resolves to the authentication response.
 */
const signIn = (apiPath: string) => {
  return async (username: string, password: string, jwt: string): Promise<AuthResponse> => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(jwt && { Authorization: `Bearer ${jwt}` })
    }

    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${apiPath}/${LOGIN_ENDPOINT}`,
      { username, password },
      { headers }
    )

    return response.data
  }
}

/**
 * Creates a function that signs out a user.
 *
 * @param apiPath - The API path.
 * @returns {Promise<void>} - A promise that resolves when the user is logged out.
 */
const signOut = (apiPath: string) => {
  return async (ppeJwt: string) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ppeJwt}`
    }

    await axios.post(`${apiPath}/${LOGOUT_ENDPOINT}`, {}, { headers })
  }
}

/**
 * Creates an instance of the authentication API.
 *
 * @param apiPath - The API path.
 * @returns {AuthApi} - The authentication API.
 */
const authApi = (apiPath: string): AuthApi => {
  const authorisePtsUser = allowPtsUser(apiPath)
  const refreshPpeJwt = refreshPpeToken(apiPath)
  const login = signIn(apiPath)
  const logout = signOut(apiPath)

  return { authorisePtsUser, refreshPpeJwt, login, logout }
}

export default authApi

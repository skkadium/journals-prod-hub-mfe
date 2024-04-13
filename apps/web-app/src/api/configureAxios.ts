import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { config } from '@repo/app-config'

/**
 * Represents the options for configuring Axios.
 */
export interface ConfigureAxiosOptions {
  onBffUnauthorized: () => void // Callback function to be executed when a 401 or 403 response is received from the BFF API.
}

/**
 * Interceptor function to be executed before making a request using Axios.
 * Adds the Authorization header to authenticated paths.
 *
 * @param requestConfig - The Axios request configuration.
 * @returns The modified Axios request configuration.
 */
const onRequest = (requestConfig: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const authenticatedPaths: string[] = [config.bff.api.path]
  const { url } = requestConfig
  if (authenticatedPaths.some(el => url?.includes(el))) {
    const token = localStorage.getItem('ppeJwt')
    if (token) {
      requestConfig.headers['Authorization'] = `Bearer ${token}`
    }
  }
  return requestConfig
}

/**
 * Interceptor function to be executed after receiving a response from Axios.
 *
 * @param axiosResponse - The Axios response.
 * @returns The Axios response.
 */
const onResponse = (axiosResponse: AxiosResponse): AxiosResponse => {
  return axiosResponse
}

/**
 * Interceptor function to be executed when an error response is received from Axios.
 * Handles 401 and 403 responses from the BFF API by calling the onBffUnauthorized callback.
 *
 * @param axiosError - The Axios error.
 * @param options - The options for configuring Axios.
 * @returns A rejected Promise with the Axios error.
 */
const onResponseError = (axiosError: AxiosError, { onBffUnauthorized }: ConfigureAxiosOptions): Promise<AxiosError> => {
  if (axiosError.config?.url?.includes(config.bff.api.path)) {
    if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
      onBffUnauthorized()
    }
  }
  return Promise.reject(axiosError)
}

/**
 * Configures Axios with the provided options.
 *
 * @param options - The options for configuring Axios.
 */
export const configureAxios = ({ onBffUnauthorized }: ConfigureAxiosOptions): void => {
  // Configure axios to configure the Authorization header on bff api requests
  axios.interceptors.request.use(onRequest)

  axios.interceptors.response.use(onResponse, error => {
    return onResponseError(error, { onBffUnauthorized })
  })

  // Set global timeout for 2 minutes
  axios.defaults.timeout = 120000
}

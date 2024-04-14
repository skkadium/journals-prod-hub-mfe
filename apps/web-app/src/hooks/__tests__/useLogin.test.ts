import { cleanup, renderHook, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import useUserStore from '../../store/user/userStore'
import { defaultHeaders } from '../../jest/jest.setup.unit'
import { LOGIN_ENDPOINT } from '../../constants'
import { useLogin } from '../useLogin'
import { config } from '@repo/app-config'

describe('hooks/useLogin', () => {
  const mockAxios = new MockAdapter(axios)
  const initialUserStore = useUserStore.getState()
  const location: Location = window.location

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.location
    window.location = {
      ...location,
      reload: jest.fn()
    }
  })
  beforeEach(() => {
    useUserStore.setState(initialUserStore, true)
  })
  afterAll(() => {
    window.location = location
  })
  afterEach(cleanup)
  it('should login user successfully', () => {
    // Arrange
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    const newPpeJwt = 'new ppe'
    const username = 'user'
    const password = 'password'
    mockAxios
      .onPost(`${config.auth.api.path}/${LOGIN_ENDPOINT}`, { username, password }, defaultHeaders)
      .reply(200, { jwt: newPpeJwt })

    // Act
    const { result } = renderHook(useLogin)
    result.current.doLogin(username, password)

    // Assert
    waitFor(() => expect(window.localStorage.setItem).toHaveBeenCalledWith('ppeJwt', newPpeJwt))
    waitFor(() => expect(window.location.reload).toHaveBeenCalled())
    waitFor(() => expect(result.current.loginFailure).toBe(false))
  })

  it('should set login failure prop on user login failure', () => {
    // Arrange
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    const username = 'user'
    const password = 'invalid'
    mockAxios
      .onPost(`${config.auth.api.path}/${LOGIN_ENDPOINT}`, { username, password }, defaultHeaders)
      .reply(401, { errorType: 'LOGIN_FAILED' })

    // Act
    const { result } = renderHook(() => useLogin())
    result.current.doLogin(username, password)

    // Assert
    waitFor(() => expect(window.localStorage.setItem).not.toHaveBeenCalled())
    expect(window.location.reload).not.toHaveBeenCalled()
    waitFor(() => expect(result.current.loginFailure).toBe(true))
  })

  it('should set server error prop if login server responds with 500', () => {
    // Arrange
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    const username = 'user'
    const password = 'serverdown'
    mockAxios
      .onPost(`${config.auth.api.path}/${LOGIN_ENDPOINT}`, { username, password }, defaultHeaders)
      .reply(500, { errorType: 'LOGIN_FAILED' })

    // Act
    const { result } = renderHook(() => useLogin())
    result.current.doLogin(username, password)

    // Assert
    waitFor(() => expect(window.localStorage.setItem).not.toHaveBeenCalled())
    expect(window.location.reload).not.toHaveBeenCalled()
    waitFor(() => expect(result.current.loginFailure).toBe(true))
    waitFor(() => expect(result.current.serverFailure).toBe(true))
  })
})

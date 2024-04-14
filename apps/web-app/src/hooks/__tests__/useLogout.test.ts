import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { useLogout } from '../useLogout'
import useUserStore from '../../store/user/userStore'
import { LOGOUT_ENDPOINT } from '../../constants'
import { authenticationHeader } from '../../jest/jest.setup.unit'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { config } from '@repo/app-config'

describe('hooks/useLogout', () => {
  const mockAxios = new MockAdapter(axios)
  const ppeJwt = 'ppe'
  const initialUserStore = useUserStore.getState()
  beforeEach(() => {
    useUserStore.setState(initialUserStore, true)
  })

  afterEach(cleanup)
  it('should render the logout function', () => {
    // Arrange
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'removeItem')

    mockAxios.onPost(`${config.auth.api.path}/${LOGOUT_ENDPOINT}`, {}, authenticationHeader(ppeJwt)).reply(200)
    window.localStorage.setItem('ppeJwt', ppeJwt)

    // Act
    const { result } = renderHook(() => useLogout())
    result.current.onLogout()

    // Assert
    expect(window.localStorage.getItem).toHaveBeenCalled()
    waitFor(() => expect(window.localStorage.removeItem).toHaveBeenCalledWith('ppeJwt'))
    waitFor(() => expect(useUserStore.getState().isLoggedOut).toBe(true))
  })
})

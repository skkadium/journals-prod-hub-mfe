import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT, REFRESH_PPE_JWT_ENDPOINT } from '../../constants'
import authApi from '../auth'
import { authenticationHeader, defaultHeaders } from '../../jest/jest.setup.unit'
describe('api/auth', () => {
  const mockAxios = new MockAdapter(axios)
  const ptsJwt = 'pts'
  const ppeJwt = 'ppe'

  describe('refreshPpeJwt', () => {
    it('should post to correct endpoint with a bearer token Authorization header and return new jwt', async () => {
      const newPpeJwt = 'new ppe'
      mockAxios
        .onPost(`/${REFRESH_PPE_JWT_ENDPOINT}`, undefined, authenticationHeader(ppeJwt))
        .reply(200, { jwt: newPpeJwt })

      const auth = authApi('')
      const { jwt } = await auth.refreshPpeJwt(ppeJwt)

      expect(jwt).toBe(newPpeJwt)
    })
  })

  describe('login', () => {
    it('should post to correct endpoint with a bearer token Authorization header username and password', async () => {
      const newPpeJwt = 'new ppe'
      const username = 'user'
      const password = 'password'
      mockAxios
        .onPost(`/${LOGIN_ENDPOINT}`, { username, password }, authenticationHeader(ptsJwt))
        .reply(200, { jwt: newPpeJwt })

      const auth = authApi('')
      const { jwt } = await auth.login(username, password, ptsJwt)

      expect(jwt).toBe(newPpeJwt)
    })

    it('should post to correct endpoint without a bearer token Authorization header and with username and password', async () => {
      const newPpeJwt = 'new ppe'
      const username = 'user'
      const password = 'password'
      mockAxios.onPost(`/${LOGIN_ENDPOINT}`, { username, password }, defaultHeaders).reply(200, { jwt: newPpeJwt })

      const auth = authApi('')
      const { jwt } = await auth.login(username, password, ptsJwt)

      expect(jwt).toBe(newPpeJwt)
    })
  })

  describe('logout', () => {
    it('should post to correct endpoint with a bearer token Authorization header', async () => {
      mockAxios.onPost(`/${LOGOUT_ENDPOINT}`, {}, authenticationHeader(ppeJwt)).reply(200)

      const spy = jest.spyOn(axios, 'post')

      const auth = authApi('')
      await auth.logout(ppeJwt)
      expect(spy).toHaveBeenCalled()
    })
  })
})

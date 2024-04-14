import { cleanup, render, screen } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Login } from '../Login'
import { config } from '@repo/app-config'
import { LOGIN_ENDPOINT } from '../../../constants'
import { defaultHeaders } from '../../../jest/jest.setup.unit'

describe('components/ui/login/Login', () => {
  const mockAxios = new MockAdapter(axios)

  afterEach(cleanup)

  describe('verify initial state', () => {
    const { container } = render(<Login />)
    it('should render LoginForm with login function and no loginFailure', () => {
      const headings = container.querySelectorAll('h2')
      const subtitle = screen.getByText(/Use your organisation account details to sign in./)
      const userIdInput = screen.getByLabelText(/User ID/)
      const passwordInput = screen.getByLabelText(/Password/)
      const signInButton = screen.getByRole('button', { name: 'Sign in' })

      expect(headings).toHaveLength(2)
      expect(headings.item(0).textContent).toEqual('Journals Production Hub')
      expect(headings.item(1).textContent).toEqual('Sign in')
      expect(subtitle).toBeVisible()

      expect(userIdInput).toBeVisible()
      expect(passwordInput).toBeVisible()
      expect(signInButton).toBeVisible()
      expect(signInButton.getAttribute('disabled')).toBe('')
    })
  })

  describe('login behaviours', () => {
    const USERNAME = 'user'
    const VALID_PASSWORD = 'valid'

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

    afterAll(() => {
      window.location = location
    })

    it('should not reload current page on login failure', async () => {
      render(<Login />)

      mockAxios
        .onPost(
          `${config.auth.api.path}/${LOGIN_ENDPOINT}`,
          { username: USERNAME, password: 'invalid' },
          defaultHeaders
        )
        .reply(401, { errorType: 'LOGIN_FAILED' })

      expect(window.location.reload).not.toHaveBeenCalled()
    })

    it('should reload current page on login success', async () => {
      render(<Login />)

      mockAxios
        .onPost(
          `${config.auth.api.path}/${LOGIN_ENDPOINT}`,
          { username: USERNAME, password: VALID_PASSWORD },
          defaultHeaders
        )
        .reply(200, { jwt: 'PPE_JWT' })

      window.location.reload()
      expect(window.location.reload).toHaveBeenCalled()
    })
  })
})

import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { LoginForm } from '../LoginForm'
import { LOGIN_SERVER_ERROR_MSG } from '../../../constants'

describe('components/ui/login/LoginForm', () => {
  const loginFn = jest.fn()
  afterEach(cleanup)
  describe('intial state verfification', () => {
    let container: HTMLElement
    beforeEach(() => {
      container = render(<LoginForm loginFailure={false} doLogin={loginFn} />).container
    })
    it('should initialise with disabled login button', () => {
      // Assert
      const signInButton = screen.getByRole('button', { name: 'Sign in' })
      expect(signInButton).toBeDisabled()
    })
    it('should initialise with no field warnings', () => {
      // Assert
      const formFieldError = container.getElementsByClassName('formFieldError')
      const formLoginFailure = container.getElementsByClassName('c-login-form__loginFailure')

      expect(formFieldError).toHaveLength(0)
      expect(formLoginFailure).toHaveLength(0)
    })
    it('should initialise with login failure', () => {
      // Assert
      const formLoginFailure = container.getElementsByClassName('c-login-form__loginFailure')
      expect(formLoginFailure).toHaveLength(0)
    })
  })

  describe('validation failure verification', () => {
    let container: HTMLElement
    beforeEach(() => {
      container = render(<LoginForm loginFailure={false} doLogin={loginFn} />).container
    })
    it('should warn on empty User ID', async () => {
      const inputUserId = screen.getByLabelText(/User ID/)

      await act(async () => {
        fireEvent.blur(inputUserId)
      })

      const formFieldError = container.getElementsByClassName('formFieldError')

      expect(formFieldError).toHaveLength(1)
      expect(formFieldError.item(0)).toHaveTextContent('A user ID must be specified')
      expect(inputUserId).toHaveClass('invalid')
    })

    it('should warn on empty password', async () => {
      const inputPassword = screen.getByLabelText(/Password/)

      await act(async () => {
        fireEvent.blur(inputPassword)
      })

      const formFieldError = container.getElementsByClassName('formFieldError')

      expect(formFieldError).toHaveLength(1)
      expect(formFieldError.item(0)).toHaveTextContent('A password must be specified')
      expect(inputPassword).toHaveClass('invalid')
    })

    it('should warn on whitespace only User ID', async () => {
      const inputUserId = screen.getByLabelText(/User ID/)

      await act(async () => {
        fireEvent.input(inputUserId, { target: { value: ' \t' } })
      })

      expect(inputUserId).toHaveClass('invalid')
    })

    it('should warn on whitespace only password', async () => {
      const inputPassword = screen.getByLabelText(/Password/)

      await act(async () => {
        fireEvent.input(inputPassword, { target: { value: ' ' } })
      })

      expect(inputPassword).toHaveClass('invalid')
    })

    it('maintain disable button until valid User ID and password', async () => {
      const inputUserId = screen.getByLabelText(/User ID/)
      const inputPassword = screen.getByLabelText(/Password/)
      const signInButton = screen.getByRole('button', { name: 'Sign in' })

      await act(async () => {
        fireEvent.input(inputUserId, { target: { value: 'user1' } })
      })

      expect(signInButton).toBeDisabled()

      await act(async () => {
        fireEvent.input(inputUserId, { target: { value: '' } })
        fireEvent.input(inputPassword, { target: { value: 'password' } })
      })

      expect(signInButton).toBeDisabled()

      await act(async () => {
        fireEvent.input(inputUserId, { target: { value: 'user1' } })
      })

      expect(signInButton).toBeEnabled()
    })
  })

  describe('verify login behaviour', () => {
    it('should call login function on sign in button click', async () => {
      render(<LoginForm loginFailure={false} doLogin={loginFn} />)
      const inputUserId = screen.getByLabelText(/User ID/)
      const inputPassword = screen.getByLabelText(/Password/)
      const signInButton = screen.getByRole('button', { name: 'Sign in' })

      await act(async () => {
        fireEvent.input(inputUserId, { target: { value: 'user1' } })
        fireEvent.input(inputPassword, { target: { value: 'password' } })
        fireEvent.submit(signInButton)
      })

      expect(loginFn).toHaveBeenCalledWith('user1', 'password')
    })

    it('should render login failure on login failure property true', () => {
      const { container } = render(<LoginForm loginFailure={true} doLogin={loginFn} />)

      const formLoginFailure = container.getElementsByClassName('c-login-form__loginFailure')
      const signInError = container.getElementsByClassName('signInError')
      const formSubmitAlert = container.getElementsByClassName('c-login-form__submit-alert')

      expect(formLoginFailure).toHaveLength(1)
      expect(formSubmitAlert).toHaveLength(1)
      expect(signInError).toHaveLength(1)
      expect(screen.getByText(/Sign in failed./)).toBeVisible()
      expect(screen.getByText(/Incorrect user ID or password./)).toBeVisible()
    })

    it('should render login server failure on login failure property true', () => {
      const { container } = render(<LoginForm loginFailure={true} doLogin={loginFn} serverFailure />)

      const formLoginFailure = container.getElementsByClassName('c-login-form__loginFailure')
      const signInServerError = container.getElementsByClassName('signInServerError')
      const formSubmitAlert = container.getElementsByClassName('c-login-form__submit-alert')

      expect(formLoginFailure).toHaveLength(1)
      expect(formSubmitAlert).toHaveLength(1)
      expect(signInServerError).toHaveLength(1)
      expect(screen.getByText(LOGIN_SERVER_ERROR_MSG)).toBeVisible()
    })

    it('should render loading indicator when login submitted then revert on failure', async () => {
      const doLoginFn = jest.fn()
      doLoginFn.mockReturnValue(Promise.resolve({ value: false }))
      const { container } = render(<LoginForm loginFailure={false} doLogin={doLoginFn} />)

      const inputUserId = screen.getByLabelText(/User ID/)
      const inputPassword = screen.getByLabelText(/Password/)
      const signInButton = screen.getByRole('button', { name: 'Sign in' })
      const loadingIndicator = container.getElementsByClassName('c-loading-indicator')

      expect(loadingIndicator).toHaveLength(0)
      expect(signInButton).toBeDisabled()

      await act(async () => {
        fireEvent.input(inputUserId, { target: { value: 'user1' } })
        fireEvent.input(inputPassword, { target: { value: 'password' } })
      })

      expect(signInButton).toBeEnabled()

      await act(async () => {
        fireEvent.submit(signInButton)
      })

      expect(loadingIndicator).toHaveLength(1)
      expect(signInButton).not.toHaveTextContent('Sign in')
      expect(signInButton).toBeDisabled()

      waitFor(() => expect(loadingIndicator).toHaveLength(0))
      waitFor(() => expect(signInButton).toHaveTextContent('Sign in'))
      waitFor(() => expect(signInButton).toBeEnabled())
    })

    it('should render loading indicator and remain loading on success', async () => {
      const doLoginFn = jest.fn()
      doLoginFn.mockReturnValue(Promise.resolve({ value: true }))
      const { container } = render(<LoginForm loginFailure={false} doLogin={doLoginFn} />)

      const inputUserId = screen.getByLabelText(/User ID/)
      const inputPassword = screen.getByLabelText(/Password/)
      const signInButton = screen.getByRole('button', { name: 'Sign in' })
      const loadingIndicator = container.getElementsByClassName('c-loading-indicator')

      expect(loadingIndicator).toHaveLength(0)
      expect(signInButton).toBeDisabled()

      await act(async () => {
        fireEvent.input(inputUserId, { target: { value: 'user1' } })
        fireEvent.input(inputPassword, { target: { value: 'password' } })
        fireEvent.submit(signInButton)
      })

      expect(loadingIndicator).toHaveLength(1)
      expect(signInButton).toBeDisabled()
    })
  })
})

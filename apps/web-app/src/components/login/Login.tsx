import { useLogin } from '../../hooks/useLogin'
import { LoginForm } from './LoginForm'
import { Toolbar } from '../toolbar/Toolbar'

/**
 * Login Component
 *
 * @description
 * A component that renders the login form.
 *
 * @returns {JSX.Element}
 * A React Element representing the login form.
 */
export const Login = () => {
  const { doLogin, loginFailure, serverFailure } = useLogin()
  return (
    <div className="c-login-container">
      <div className="c-login-container__toolbar">
        <Toolbar />
      </div>
      <div className="c-login-container__content">
        <LoginForm loginFailure={loginFailure} doLogin={doLogin} serverFailure={serverFailure} />
      </div>
    </div>
  )
}

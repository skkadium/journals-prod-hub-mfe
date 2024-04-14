import { Login } from '../components/login/Login'
import { SecureApp } from '../components/secure/SecureApp'
import { SecureStates } from '../constants'
import { configureAxios } from '../api/configureAxios'
import { LoginError } from '../components/login/LoginError'
import { Toolbar } from '../components/toolbar/Toolbar'
import { Unauthorised } from '../components/login/Unauthorised'
import PageRoutes from './routes/PageRoutes'

// Configure Axios with a callback function to handle unauthorized requests.
// If a request is unauthorized, the function will remove the onbeforeunload event handler and reload the page.
configureAxios({
  onBffUnauthorized: () => {
    window.onbeforeunload = null
    window.location.reload()
  }
})

/**
 * AppRoot Component
 *
 * @description
 * The root component of the application. It renders different components based on the secure state.
 *
 * @returns {JSX.Element}
 * A React Element representing the root of the application UI.
 */
const AppRoot = () => {
  return (
    <SecureApp>
      {({ secureState }) => {
        switch (secureState) {
          case SecureStates.AUTHENTICATED:
            return (
              <div className="c-app-container">
                <div className="c-app-container__toolbar">
                  <Toolbar showLogout showNavItems />
                </div>
                <div className="c-app-container__content reverse_column">
                  <PageRoutes />
                </div>
              </div>
            )
          case SecureStates.LOGIN_REQUIRED:
            return <Login />
          case SecureStates.UNAUTHORISED:
            return <Unauthorised />
          case SecureStates.REJECTED:
            return <LoginError message="Please try again." />
          default:
            return
        }
      }}
    </SecureApp>
  )
}

export default AppRoot

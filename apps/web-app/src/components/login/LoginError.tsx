import { ModalType, Indicator } from '../../constants'
import ModalDialog from '../ui/modal/ModalDialog'
import { Toolbar } from '../toolbar/Toolbar'

interface LoginErrorProps {
  message: string
  title?: string
}

/**
 * LoginError Component
 *
 * @description
 * A component that displays a login error message in a modal dialog.
 *
 * @param {string} message - The error message to display.
 * @param {string} [title=''] - The title of the modal dialog.
 * @returns {JSX.Element}
 * A React Element representing the login error message in a modal dialog.
 */
export const LoginError = ({ message, title = '' }: LoginErrorProps) => (
  <div className="c-login-container">
    <div className="c-login-container__toolbar">
      <Toolbar />
    </div>
    <ModalDialog
      defaultProperties={{
        title,
        loginErrorMessage: message,
        modalType: ModalType.loginError,
        indicator: Indicator.warn
      }}
    />
  </div>
)

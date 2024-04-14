import { ReactComponent as WarningIcon } from '../../assets/icons/warning.svg'
import { Toolbar } from '../toolbar/Toolbar'

/**
 * Unauthorised Component
 *
 * @description
 * A component that is rendered when a user is unauthorized to access a feature.
 * It displays a warning message and a contact information for the system owner.
 *
 * @returns {JSX.Element}
 * A React Element representing the unauthorized component.
 */
export const Unauthorised = () => (
  <div className="c-login-container">
    <div className="c-login-container__toolbar">
      <Toolbar />
    </div>
    <div className="c-login-container__content">
      <div className="c-login-form__border">
        <div className="c-login-form c-unauthorised__content">
          <p>
            <WarningIcon className="c-icon c-icon--xxl c-unauthorised__warning-icon" />
            <span className="c-unauthorised__warning-heading">Sorry,</span>
          </p>
          <p>
            <span>You do not have permission to use this feature.</span>
          </p>
          <hr />
          <p>
            <b>Please refer to PPE procedures for guidance on accessing this application.</b>
          </p>
        </div>
      </div>
    </div>
  </div>
)

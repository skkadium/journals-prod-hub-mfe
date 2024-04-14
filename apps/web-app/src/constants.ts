export const AUTHORISE_PTS_USER_ENDPOINT = 'authorisePtsUser'
export const REFRESH_PPE_JWT_ENDPOINT = 'refresh'
export const LOGIN_ENDPOINT = 'login'
export const LOGOUT_ENDPOINT = 'logout'
export const LOGIN_SERVER_ERROR_MSG = 'We hit an unexpected problem authenticating you. Please try again later'
export const SecureStates = {
  AUTHENTICATED: 'SECURE::AUTHENTICATED',
  LOGIN_REQUIRED: 'SECURE::LOGIN_REQUIRED',
  REJECTED: 'SECURE::REJECTED',
  UNAUTHORISED: 'SECURE::UNAUTHORISED'
}

export const ButtonType = {
  swish: 'swish',
  default: 'default'
}

export const Indicator = {
  alert: 'alert',
  info: 'info',
  warn: 'warn'
}

export const ModalType = {
  swish: 'swish',
  critical: 'critical',
  confirm: 'confirm',
  default: 'default',
  loginError: 'loginError'
}

export const IssueDropDownItems = ['Find an issue']

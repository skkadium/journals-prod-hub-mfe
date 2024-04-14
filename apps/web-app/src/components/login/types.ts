export interface LoginProps {
  serverFailure?: boolean
  loginFailure: boolean
  doLogin: (username: string, password: string) => Promise<boolean>
}

export const initialFormPropsState: LoginFormProps = {
  userId: '',
  password: ''
}

export interface LoginFormProps {
  userId: string
  password: string
}

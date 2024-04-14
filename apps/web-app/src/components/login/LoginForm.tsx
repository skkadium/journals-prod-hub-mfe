import Flag from '../layout/Flag'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReactComponent as AlertIcon } from '../../assets/icons/alert.svg'
import { FieldError } from './FieldError'
import { Fragment, KeyboardEvent, useState } from 'react'
import LoadingIndicator from '../ui/LoadingIndicator'
import * as Yup from 'yup'
import { LoginFormProps, LoginProps, initialFormPropsState } from './types'
import { useForm } from 'react-hook-form'
import { LOGIN_SERVER_ERROR_MSG } from '../../constants'

/**
 * validationSchema
 *
 * @description
 * A Yup validation schema for the login form.
 * It defines the shape and validation rules for the form fields.
 *
 * @type {Object}
 */
const validationSchema = Yup.object().shape({
  userId: Yup.string()
    .required('A user ID must be specified')
    .matches(/^(\S+$)/, 'A user ID must be specified'),
  password: Yup.string()
    .required('A password must be specified')
    .matches(/^(\S+$)/, 'A password must be specified')
})

/**
 * renderFormError
 *
 * @description
 * A function that renders the form error component.
 * It displays an error message when the login form submission fails.
 *
 * @returns {JSX.Element}
 * A React Element representing the form error component.
 */
const renderFormError = (serverFailure: boolean) => {
  return (
    <Flag.Body className="c-login-form__loginFailure">
      <Flag.Flag>
        <Flag.Component>
          <div className="c-login-form__submit-alert">
            <AlertIcon className="c-icon c-icon--xs" />
          </div>
        </Flag.Component>
        <Flag.Body>
          {serverFailure ? (
            <div className="signInServerError">{LOGIN_SERVER_ERROR_MSG}</div>
          ) : (
            <div className="signInError">
              <div>Sign in failed.</div>
              <div>Incorrect user ID or password.</div>
            </div>
          )}
        </Flag.Body>
      </Flag.Flag>
    </Flag.Body>
  )
}

/**
 * Represents a login form component.
 *
 * @param loginProps - The props for the login form.
 *
 * @returns {JSX.Element} - The login form component.
 */
export const LoginForm = (loginProps: LoginProps) => {
  const { doLogin, serverFailure, loginFailure } = loginProps
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Handles the form submission.
   *
   * @param data - The form data.
   *
   * @returns {Promise<void>} - A promise that resolves when the login is successful.
   */
  const onSubmit = async (data: LoginFormProps) => {
    setIsSubmitting(true)
    const success = await doLogin(data.userId, data.password)
    if (!success) {
      setIsSubmitting(false)
    }
  }

  const { register, handleSubmit, formState, setFocus } = useForm<LoginFormProps>({
    defaultValues: { ...initialFormPropsState },
    resolver: yupResolver(validationSchema),
    mode: 'all'
  })

  const { errors, isValid } = formState

  /**
   * Handles the "Enter" key press event.
   *
   * @param event - The keyboard event.
   */
  const handleOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key, currentTarget } = event
    if (key === 'Enter') {
      if (currentTarget.name === 'userId') {
        setFocus('password')
        event.preventDefault()
      }
    }
  }

  return (
    <div className="c-login-form__border">
      <div className="c-login-form">
        <div className="c-login-form__intro">
          <h2>Sign in</h2>
          <p>Use your organisation account details to sign in.</p>
        </div>
        <div className="c-login-form__form">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <label htmlFor="userId">
              User ID
              <input
                id="userId"
                type="text"
                {...register('userId')}
                className={errors.userId ? 'invalid' : ''}
                onKeyDown={handleOnEnter}
                onFocus={evt => evt.currentTarget.setSelectionRange(0, 0)}
                autoFocus
                required
              />
            </label>
            <FieldError error={errors.userId?.message ?? ''} />
            <label htmlFor="password">
              Password
              <input
                id="password"
                type="password"
                {...register('password')}
                className={errors.password ? 'invalid' : ''}
                onKeyDown={handleOnEnter}
              />
            </label>
            <FieldError error={errors.password?.message ?? ''} />
            <Flag.Flag className="c-login-form__submit">
              <Flag.Component>
                <button
                  type="submit"
                  className="c-button c-button--blue"
                  aria-label="Sign in"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? <LoadingIndicator /> : <Fragment>Sign in</Fragment>}
                </button>
              </Flag.Component>
              {loginFailure && !isSubmitting ? renderFormError(serverFailure!) : null}
            </Flag.Flag>
          </form>
        </div>
      </div>
    </div>
  )
}

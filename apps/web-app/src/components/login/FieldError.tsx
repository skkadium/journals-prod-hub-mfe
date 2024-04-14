interface FieldErrorProps {
  error?: string | null
}

/**
 * FieldError Component
 *
 * @description
 * A component that displays an error message for a form field.
 *
 * @param {string|null} error - The error message to display.
 * @returns {JSX.Element|null}
 * A React Element representing the error message or null if there is no error.
 */
export const FieldError = ({ error = '' }: FieldErrorProps) => {
  if (!error) {
    return null
  }

  return <div className="formFieldError">{error}</div>
}

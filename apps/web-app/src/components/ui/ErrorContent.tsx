import { PropsWithChildren } from 'react'

interface ErrorProps extends PropsWithChildren {}

// Renamed to ErrorContent.
// Reason: To fix - Do not use "Error" to declare a variable - use another name.sonarlint(typescript:S2137)
const ErrorContent = ({ children }: ErrorProps) => (
  <div className="c-error">
    <span>{children}</span>
  </div>
)

export default ErrorContent

import { ReactNode } from 'react'
import { useSecureStates } from '../../hooks/useSecureStates'

interface SecureAppProps {
  children: (data: { secureState: string }) => ReactNode
}

/**
 * SecureApp Component
 *
 * @description
 * A component that handles the secure state of the application.
 * It renders the children function with the secure state as a parameter.
 *
 * @param {Function} children - A function that receives the secure state as a parameter.
 * @returns {JSX.Element|null}
 * A React Element representing the various secure state of the application or null.
 */
export const SecureApp = ({ children }: SecureAppProps) => {
  const { working, secureState } = useSecureStates()
  // Don't render anything while authorising the user
  return working ? null : children({ secureState })
}

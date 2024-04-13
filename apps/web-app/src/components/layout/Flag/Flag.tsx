import { PropsWithChildren } from 'react'

interface FlagProps extends PropsWithChildren {
  className?: string
}

export const Flag = ({ children, className = '' }: FlagProps) => <div className={`o-flag ${className}`}>{children}</div>

import { PropsWithChildren } from 'react'

interface BodyProps extends PropsWithChildren {
  className?: string
}

export const Body = ({ children, className = '' }: BodyProps) => (
  <div className={`o-flag__body ${className}`}>{children}</div>
)

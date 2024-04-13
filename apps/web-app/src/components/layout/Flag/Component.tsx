import { PropsWithChildren } from 'react'

interface ComponentProps extends PropsWithChildren {
  className?: string
}

export const Component = ({ children, className = '' }: ComponentProps) => (
  <div className={`o-flag__component ${className}`}>{children}</div>
)

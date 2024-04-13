import { PropsWithChildren } from 'react'

interface FloodProps extends PropsWithChildren {
  className?: string
}

export const Flood = ({ children, className = '' }: FloodProps) => (
  <div className={`o-flood ${className}`}>{children}</div>
)

import { PropsWithChildren } from 'react'

interface HoverContentProps extends PropsWithChildren {}

export const HoverContent = ({ children }: HoverContentProps) => (
  <div className="c-fixed-table__hover-content">{children}</div>
)

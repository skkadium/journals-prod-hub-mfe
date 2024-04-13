import { PropsWithChildren } from 'react'

interface BodyProps extends PropsWithChildren {}

export const Body = ({ children }: BodyProps) => (
  <div className="c-fixed-table__body" role="rowgroup">
    {children}
  </div>
)

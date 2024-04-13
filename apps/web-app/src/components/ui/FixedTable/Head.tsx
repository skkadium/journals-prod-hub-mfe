import { PropsWithChildren } from 'react'

interface HeadProps extends PropsWithChildren {}

export const Head = ({ children }: HeadProps) => (
  <div className="c-fixed-table__head" role="rowgroup">
    {children}
  </div>
)

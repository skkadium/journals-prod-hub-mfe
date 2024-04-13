import { PropsWithChildren } from 'react'

interface HeaderRowProps extends PropsWithChildren {}

export const HeaderRow = ({ children }: HeaderRowProps) => (
  <div className="c-fixed-table__header-row" role="row">
    {children}
  </div>
)

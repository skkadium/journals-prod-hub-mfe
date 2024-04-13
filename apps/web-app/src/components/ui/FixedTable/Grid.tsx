import { PropsWithChildren, forwardRef } from 'react'

interface GridProps extends PropsWithChildren {}

export const Grid = forwardRef<HTMLDivElement, GridProps>(({ children }, ref) => (
  <div className="c-fixed-table__grid" role="grid">
    <div className="c-fixed-table__grid-inner" ref={ref}>
      {children}
    </div>
  </div>
))

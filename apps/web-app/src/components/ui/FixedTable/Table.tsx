import { PropsWithChildren } from 'react'

interface TableProps extends PropsWithChildren {
  dragging?: boolean
  label?: string
  className?: string
}

export const Table = ({ children, dragging, label, className }: TableProps) => (
  <div className={`c-fixed-table ${dragging ? 'is-dragging' : ''} ${className ?? ''} `} aria-label={label} role="table">
    {children}
  </div>
)

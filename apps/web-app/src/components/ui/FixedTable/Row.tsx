import { PropsWithChildren } from 'react'

interface RowProps extends PropsWithChildren {
  expanded?: boolean
  bordered?: boolean
  onSingleClick?: () => void
  onDoubleClick?: () => void
}

export const Row = ({ children, expanded = false, bordered = false, onDoubleClick, onSingleClick }: RowProps) => (
  <div
    className={`c-fixed-table__row ${expanded ? 'is-expanded' : ''} ${bordered ? 'is-bordered' : ''}`}
    onDoubleClick={onDoubleClick}
    onClick={onSingleClick}
    role="row"
  >
    {children}
  </div>
)

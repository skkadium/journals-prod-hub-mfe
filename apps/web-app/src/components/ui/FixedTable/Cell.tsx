import { PropsWithChildren } from 'react'

interface CellProps extends PropsWithChildren {
  width?: string | null
  className?: string
}

export const Cell = ({ children, width, className = '' }: CellProps) => {
  const attributes = {
    role: 'cell',
    className: 'c-fixed-table__cell',
    style: {}
  }

  if (width) {
    attributes.style = { width }
  }

  if (className) {
    attributes.className = `${attributes.className} ${className}`
  }

  return <div {...attributes}>{children}</div>
}

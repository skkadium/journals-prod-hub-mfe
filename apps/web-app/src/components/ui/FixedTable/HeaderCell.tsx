import { PropsWithChildren } from 'react'

interface HeaderCellProps extends PropsWithChildren {
  width?: string | null
  className?: string
}

export const HeaderCell = ({ children, width, className = '' }: HeaderCellProps) => {
  const attributes = {
    role: 'columnHeader',
    className: 'c-fixed-table__header-cell',
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

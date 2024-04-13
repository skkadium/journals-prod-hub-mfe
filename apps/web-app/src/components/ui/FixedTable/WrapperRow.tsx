import { PropsWithChildren } from 'react'

interface WrapperRowProps extends PropsWithChildren {
  faded?: boolean
  highlighted?: boolean
  classNames?: string[] | []
}

export const WrapperRow = ({ children, faded, highlighted, classNames }: WrapperRowProps) => (
  <div
    className={`c-fixed-table__wrapper-row ${highlighted ? 'highlighted' : ''} ${faded ? 'c-fixed-table--fade' : ''} ${
      classNames ? classNames.join(' ') : ''
    }`}
    role="row"
  >
    {children}
  </div>
)

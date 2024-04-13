import { PropsWithChildren } from 'react'

interface HeaderProps extends PropsWithChildren {}

export const Header = ({ children }: HeaderProps) => <div className="c-fixed-table__header">{children}</div>

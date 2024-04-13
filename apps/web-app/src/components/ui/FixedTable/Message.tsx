import { PropsWithChildren } from 'react'

interface MessageProps extends PropsWithChildren {}

export const Message = ({ children }: MessageProps) => <span className="c-fixed-table__message">{children}</span>

import { PropsWithChildren } from 'react'

export interface MessageProps {
  description: string
  code?: string
}

export interface DefaultProperties {
  title: string
  onClose?: () => void
  messages?: MessageProps[]
  loginErrorMessage?: string
  modalType: string
  indicator: string
  heading?: string
}

export interface ButtonProps {
  title?: string
  onClick?: () => void
}

export interface ConfirmButtonProps extends ButtonProps {
  onConfirm?: () => void
}

export interface SwishButtonProps extends ButtonProps {
  buttonType?: string
  buttonProps?: ButtonProps[]
}

export interface ModalDialogProps extends PropsWithChildren {
  defaultProperties: DefaultProperties
  confirmProps?: ConfirmButtonProps
  swishProps?: SwishButtonProps
  subHeading?: string
}

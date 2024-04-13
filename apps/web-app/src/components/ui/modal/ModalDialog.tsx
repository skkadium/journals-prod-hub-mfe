/**
 *
 * The below page provides information on the different types of modal dialogs and their configurations.
 * @see https://elsevier.atlassian.net/wiki/spaces/PPE/pages/119601081444347/PPE+Modal+Dialog+Component
 *
 */

import { ButtonType, Indicator, ModalType } from '../../../constants'
import { ButtonProps, ConfirmButtonProps, DefaultProperties, ModalDialogProps, SwishButtonProps } from './types'
import { ReactComponent as AlertIcon } from '../../../assets/icons/alert.svg'
import { ReactComponent as InfoIcon } from '../../../assets/icons/info.svg'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import { ReactComponent as WarningIcon } from '../../../assets/icons/warning.svg'
import { ReactComponent as ChevronIcon } from '../../../assets/icons/chevron-right.svg'
import { Fragment } from 'react'
import Flag from '../../layout/Flag'

const isLoginErrorModal = (modalType: string) => ModalType.loginError === modalType

const renderCloseLink = (onCloseFn: () => void) => (
  <button key="Close" className="c-modal-dialog__close bg_white" onClick={onCloseFn}>
    Close
  </button>
)

const createCloseButton = (onClose: () => void, classNames: string[]) => (
  <button
    aria-label="Close"
    className={`c-icon-button c-icon-button--blue c-icon-button--none ${classNames ? classNames.join(' ') : ''}`}
    onClick={onClose}
    title="Close"
  >
    <CloseIcon className="c-icon c-icon--sm" onClick={onClose} />
  </button>
)

const renderIndicatorIcon = (indicator: string) => {
  switch (indicator) {
    case Indicator.alert:
      return (
        <div className="c-modal-dialog__alertIcon">
          <AlertIcon className="c-icon c-icon--sm" />
        </div>
      )
    case Indicator.info:
      return (
        <div className="c-modal-dialog__infoIcon">
          <InfoIcon className="c-icon c-icon--sm" />
        </div>
      )
    case Indicator.warn:
      return <WarningIcon className="c-icon c-icon--xxl c-modal-dialog__warning-icon" />
    default:
      return <div />
  }
}

const renderErrorMessages = (defaultProperties: DefaultProperties) => {
  const { messages } = defaultProperties
  return messages ? (
    <ul className="c-modal-dialog__messageList">
      {messages.map(message => (
        <li className="c-modal-dialog__messageItem" key={message.code}>
          {message.description}
        </li>
      ))}
    </ul>
  ) : (
    ''
  )
}

const renderBespokeBtnElement = (
  title: string,
  classNames: string[],
  onClickFn: () => void,
  isModalTypeConfirm: boolean
) => (
  <button
    type="button"
    className={`c-button-sm c-swish-content__button ${classNames ? classNames.join(' ') : ''}`}
    onClick={onClickFn}
    title={title}
    aria-label={title}
  >
    <Flag.Flag className="u-align-center">
      {title}
      {isModalTypeConfirm && (
        <Flag.Component>
          <ChevronIcon className="c-icon c-icon--lg" />
        </Flag.Component>
      )}
    </Flag.Flag>
  </button>
)

const renderConfirmBtn = (onCloseFn: () => void, confirmProps?: ConfirmButtonProps | null) =>
  confirmProps ? (
    <div style={{ float: 'right' }}>
      <Flag.Flag>
        <Flag.Component className="u-soft-right-lg">
          {renderBespokeBtnElement(
            'Cancel',
            ['c-button--white', 'c-modal-dialog__confirmation-button_margin'],
            onCloseFn,
            false
          )}
          {renderBespokeBtnElement(
            confirmProps.title!,
            ['c-button--blue', 'c-modal-dialog__confirmation-button_margin'],
            confirmProps.onConfirm!,
            true
          )}
        </Flag.Component>
      </Flag.Flag>
    </div>
  ) : (
    renderCloseLink(onCloseFn)
  )

const renderDefaultBtnElement = (buttonProperties: ButtonProps[], onClose: () => void) => {
  if (buttonProperties && buttonProperties.length > 0) {
    return buttonProperties.map(buttonProps => (
      <button key={buttonProps.title} className="c-modal-dialog__close bg_white" onClick={buttonProps.onClick}>
        {buttonProps.title}
      </button>
    ))
  }

  return renderCloseLink(onClose)
}

const renderSwishBtns = (buttonProperties: ButtonProps[], onClose: () => void) => {
  if (buttonProperties.length > 0) {
    const leftBtnProp = buttonProperties[0]
    const rightBtnProp = buttonProperties[1]
    return (
      <div className="c-modal-dialog__swish_buttons">
        <Flag.Flag>
          <Flag.Component className="u-soft-right-lg">
            {renderBespokeBtnElement(leftBtnProp.title!, ['c-button--white'], leftBtnProp.onClick!, false)}
          </Flag.Component>
          <Flag.Component className="u-soft-right-md">
            {renderBespokeBtnElement(rightBtnProp.title!, ['c-button--blue'], rightBtnProp.onClick!, false)}
          </Flag.Component>
        </Flag.Flag>
      </div>
    )
  }
  return renderCloseLink(onClose)
}
const renderSwishContent = (onCloseFn: () => void, swishProps?: SwishButtonProps | null) => {
  if (swishProps) {
    return swishProps.buttonType === ButtonType.swish
      ? renderSwishBtns(swishProps.buttonProps!, onCloseFn)
      : renderDefaultBtnElement(swishProps.buttonProps!, onCloseFn)
  }
  return ''
}

const renderModalDialogContent = (defaultProperties: DefaultProperties, modalContentProps?: ButtonProps | null) => {
  const { modalType, onClose } = defaultProperties
  switch (modalType) {
    case ModalType.confirm:
      return renderConfirmBtn(onClose!, modalContentProps)
    case ModalType.swish:
      return renderSwishContent(onClose!, modalContentProps)
    default:
      return renderCloseLink(onClose!)
  }
}

const renderDefaultModalDialogHeader = (defaultProperties: DefaultProperties) => {
  const { indicator, title, onClose } = defaultProperties
  return (
    <div className="c-modal-dialog__title">
      {renderIndicatorIcon(indicator)}
      <div className="c-modal-dialog__titleText">{title}</div>
      <div className="c-modal-dialog__closeIcon">{createCloseButton(onClose!, [])}</div>
    </div>
  )
}

const renderCriticalModalDialog = (defaultProperties: DefaultProperties) => (
  <Fragment>
    <div className="c-modal-dialog__title">
      <div className="c-modal-dialog__plain-content">
        <div className="c-modal-dialog__header">
          {renderIndicatorIcon(defaultProperties.indicator)}
          <span className="c-modal-dialog__warning-heading">
            {defaultProperties.heading || 'Sorry,'}
            {defaultProperties.onClose && createCloseButton(defaultProperties.onClose, ['critical'])}
          </span>
        </div>
        <p className="c-modal-dialog__titleText">{defaultProperties.title}</p>
        {defaultProperties.messages && defaultProperties.messages.length > 0 && <hr />}
        <div>{renderErrorMessages(defaultProperties)}</div>
        {defaultProperties.onClose && renderCloseLink(defaultProperties.onClose)}
      </div>
    </div>
  </Fragment>
)

const renderLoginErrorModalDialog = (defaultProperties: DefaultProperties) => (
  <Fragment>
    <div className="c-login-form">
      <div className="c-login-error__content">
        <p>
          {renderIndicatorIcon(defaultProperties.indicator)}
          <span className="c-login-error__warning-heading">{defaultProperties.title || 'Sorry,'}</span>
        </p>
        <p className="c-login-error__warning-text">{defaultProperties.loginErrorMessage}</p>
      </div>
    </div>
  </Fragment>
)

const ModalDialog = ({ defaultProperties, children, confirmProps, swishProps, subHeading }: ModalDialogProps) => {
  const renderDefaultModalDialog = (modalContentProps?: ButtonProps | null) => (
    <Fragment>
      {renderDefaultModalDialogHeader(defaultProperties)}
      <div className="c-modal-dialog__content">
        {subHeading && <p>{subHeading}</p>}
        {renderErrorMessages(defaultProperties)}
        {children && <div>{children}</div>}
        {renderModalDialogContent(defaultProperties, modalContentProps)}
      </div>
    </Fragment>
  )
  const renderModalDialog = () => {
    const { modalType } = defaultProperties
    switch (modalType) {
      case ModalType.confirm:
        return renderDefaultModalDialog(confirmProps)
      case ModalType.critical:
        return renderCriticalModalDialog(defaultProperties)
      case ModalType.swish:
        return renderDefaultModalDialog(swishProps)
      case ModalType.loginError:
        return renderLoginErrorModalDialog(defaultProperties)
      default:
        return renderDefaultModalDialog(null)
    }
  }

  return (
    <div
      className={
        isLoginErrorModal(defaultProperties.modalType) ? 'c-login-container__content' : 'c-modal-dialog__overlay'
      }
    >
      <div
        className={isLoginErrorModal(defaultProperties.modalType) ? 'c-login-form__border' : 'c-modal-dialog__border'}
      >
        {renderModalDialog()}
      </div>
    </div>
  )
}

export default ModalDialog

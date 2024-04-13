import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ModalDialog from '../modal/ModalDialog'
import { Indicator, ModalType } from '../../../constants'

describe('components/ui/ModalDialog', () => {
  const title = 'Title Text'
  const messages = [
    { code: '001', description: 'desc 001' },
    { code: '002', description: 'desc 002' }
  ]
  const closeFn = jest.fn()
  const confirm = {
    title: 'Remove',
    onConfirm: jest.fn()
  }

  afterEach(cleanup)

  describe('Default Modal', () => {
    let container: HTMLElement

    beforeEach(() => {
      container = render(
        <ModalDialog
          defaultProperties={{
            title,
            messages,
            modalType: ModalType.default,
            indicator: Indicator.info,
            onClose: closeFn
          }}
        />
      ).container
    })

    it('should render info icon', () => {
      const infoIcon = container.getElementsByClassName('c-modal-dialog__infoIcon')
      expect(infoIcon).toHaveLength(1)
    })

    it('should render title text', () => {
      const titleText = container.getElementsByClassName('c-modal-dialog__titleText')
      expect(titleText.item(0)).toHaveTextContent(title)
    })

    it('should render messages', () => {
      const messageList = container.querySelector('ul')
      expect(messageList?.children).toHaveLength(2)
      expect(messageList?.children.item(0)).toHaveTextContent(messages[0].description)
      expect(messageList?.children.item(1)).toHaveTextContent(messages[1].description)
    })

    it('should call closeFn on close icon click', () => {
      const buttons = screen.getAllByRole('button', { name: 'Close' })
      expect(buttons).toHaveLength(2)
      buttons.at(0)?.click()
      expect(closeFn).toHaveBeenCalled()
    })

    it('should call closeFn on close button click', () => {
      const buttons = screen.getAllByRole('button', { name: 'Close' })
      expect(buttons).toHaveLength(2)
      buttons.at(1)?.click()
      expect(closeFn).toHaveBeenCalled()
    })

    it('should render alert icon', () => {
      container = render(
        <ModalDialog
          defaultProperties={{
            title,
            messages,
            modalType: ModalType.default,
            indicator: Indicator.alert,
            onClose: closeFn
          }}
        />
      ).container
      const alertIcon = container.getElementsByClassName('c-modal-dialog__alertIcon')
      expect(alertIcon).toHaveLength(1)
    })
  })

  describe('Confirm Modal', () => {
    let container: HTMLElement

    beforeEach(() => {
      container = render(
        <ModalDialog
          defaultProperties={{
            title,
            messages,
            modalType: ModalType.confirm,
            indicator: Indicator.alert,
            onClose: closeFn
          }}
          confirmProps={confirm}
        />
      ).container
    })

    it('should not render close button and should render confirmation buttons when passing confirmation', () => {
      const closeDialog = container.getElementsByClassName('c-modal-dialog__close')
      const buttons = container.getElementsByClassName('c-modal-dialog__confirmation-button_margin')
      expect(closeDialog).toHaveLength(0)
      expect(buttons).toHaveLength(2)
    })

    it('should call confirmation function on confirm(remove) button click', () => {
      const { title, onConfirm } = confirm
      const removeBtn = screen.getByRole('button', { name: title })
      fireEvent.click(removeBtn)
      expect(onConfirm).toHaveBeenCalled()
    })

    it('should call closeFn function on cancel button click', () => {
      const cancelBtn = screen.getByRole('button', { name: 'Cancel' })
      fireEvent.click(cancelBtn)
      expect(closeFn).toHaveBeenCalled()
    })
  })
})

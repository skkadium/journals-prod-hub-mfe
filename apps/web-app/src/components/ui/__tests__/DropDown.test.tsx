import { render, fireEvent, screen } from '@testing-library/react'
import Dropdown from '../DropDown'

// Utility function to render the Dropdown component with provided props.
const renderDropdown = (headerLabel: string, items: string[]) => {
  render(<Dropdown headerLabel={headerLabel} items={items} />)
}

// Utility function to simulate user actions for showing the dropdown menu.
const showDropdown = (button: Node | Window) => {
  fireEvent.mouseEnter(button)
}

// Utility function to simulate user actions for hiding the dropdown menu.
const hideDropdown = (button: Node | Window) => {
  fireEvent.mouseLeave(button)
}

describe('Dropdown', () => {
  // Test for checking if the dropdown header label renders correctly.
  it('renders the header label', () => {
    renderDropdown('Issue', ['create Issue'])
    // The regex /issue/i makes the match case-insensitive.
    expect(screen.getByRole('button', { name: /issue/i })).toBeInTheDocument()
  })

  // Test for verifying the dropdown expands and collapses on mouse enter and leave.
  it('expands and collapses on mouse enter and leave', async () => {
    renderDropdown('Issue', ['create Issue'])
    const button = screen.getByRole('button', { name: /issue/i })

    showDropdown(button)
    expect(screen.getByText('create Issue')).toBeVisible()

    hideDropdown(button)
    expect(screen.queryByText('create Issue')).not.toBeInTheDocument()
  })

  // Test for checking the dropdown collapses when the focus is moved away.
  it('collapses on blur', async () => {
    renderDropdown('Issue', ['create Issue'])
    const button = screen.getByRole('button', { name: /issue/i })

    showDropdown(button)
    fireEvent.blur(button)
    expect(screen.queryByText('create Issue')).not.toBeInTheDocument()
  })

  // Test for verifying the dropdown toggles on keying up with Tab.
  it('toggles expansion on key up with Tab', () => {
    renderDropdown('Issue', ['create Issue'])
    const button = screen.getByRole('button', { name: /issue/i })

    fireEvent.keyUp(button, { key: 'Tab', code: 'Tab' })
    expect(screen.getByText('create Issue')).toBeVisible()
  })
})

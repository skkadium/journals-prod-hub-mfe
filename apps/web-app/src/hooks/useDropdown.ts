import { FocusEvent, KeyboardEvent, useState } from 'react'
export const useDropdown = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const expandSubNav = () => setIsExpanded(true)
  const collapseSubNav = () => setIsExpanded(false)

  const onKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Tab') {
      expandSubNav()
    }
  }

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      collapseSubNav()
    }
  }

  return { isExpanded, expandSubNav, collapseSubNav, onKeyUp, onBlur }
}

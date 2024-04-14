import { Icon } from '@els/els-react--icon'
import { Link } from 'react-router-dom'
import { useDropdown } from '../../hooks/useDropdown'
import { FIND_AN_ISSUE } from '../../app/routes/PageRoutes'

interface DropdownProps {
  headerLabel: string
  items: string[]
}

const Dropdown = ({ headerLabel, items }: DropdownProps) => {
  const { isExpanded, expandSubNav, collapseSubNav, onKeyUp, onBlur } = useDropdown()

  return (
    <div onMouseEnter={expandSubNav} onMouseLeave={collapseSubNav} onBlur={onBlur}>
      <button
        className="button button--link u-els-anchorize u-els-color-text u-els-font-size-h4 "
        onKeyUp={onKeyUp}
        aria-haspopup
        aria-expanded={isExpanded}
      >
        <div>
          <span className="u-els-margin-1o4">{headerLabel}</span>
          {isExpanded ? (
            <Icon sprite="ChevronUp" isVisible={true} a11y={{ name: 'ChevronUp', description: 'Collapse' }} />
          ) : (
            <Icon sprite="ChevronDown" isVisible={true} a11y={{ name: 'ChevronDown', description: 'Expand' }} />
          )}
        </div>
      </button>
      {isExpanded && (
        <ul className={`sub-nav ${headerLabel}`} aria-label={headerLabel}>
          {items.map(item => (
            <li key={item} className="sub-nav-item">
              <Link to={FIND_AN_ISSUE} style={{ textDecoration: 'none' }} id="findIssue">
                <button className="u-els-color-text u-els-anchorize u-els-font-size-base">{item}</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown

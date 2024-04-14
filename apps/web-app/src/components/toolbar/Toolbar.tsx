import Flag from '../layout/Flag'
import logo from '../../assets/icons/ppeLogo.svg'
import Dropdown from '../ui/DropDown'
import { IssueDropDownItems } from '../../constants'
import HelpButton from '../ui/HelpButton'
import LogoutButton from '../ui/LogoutButton'
import { WEB_APP_PATH } from '../../app/routes/PageRoutes'
import { Link } from 'react-router-dom'

interface ToolbarProps {
  showLogout?: boolean
  showHelp?: boolean
  showNavItems?: boolean
}
/**
 * Toolbar Component
 *
 * @description
 * A component that represents the toolbar at the top of the page.
 *
 * @returns {JSX.Element} - The rendered toolbar.
 */
export const Toolbar = ({ showLogout = false, showHelp = true, showNavItems = false }: ToolbarProps) => {
  return (
    <div className="c-toolbar">
      <Flag.Flag className="u-fill-height flex-layout--center">
        <Flag.Component>
          <div className="c-toolbar-header">
            <img src={logo} className="ppe-logo u-els-margin-right-1o2 " alt="ppe-logo" />
            <Link to={WEB_APP_PATH} style={{ textDecoration: 'none' }} id="home">
              <h2 className="c-toolbar-header__text u-els-color-text u-els-font-size-h3">Journals Production Hub</h2>
            </Link>
          </div>
        </Flag.Component>
        <Flag.Component className={showNavItems ? 'flex-layout' : ''}>
          {showNavItems && (
            <Flag.Component className="flex-layout">
              <Dropdown headerLabel="Issues" items={IssueDropDownItems} />
              <Flag.Component>
                <button className="u-els-anchorize u-els-color-text  u-els-margin-left-1x1o2 u-els-font-size-h4 ">
                  <span>Articles</span>
                </button>
              </Flag.Component>
            </Flag.Component>
          )}
          <Flag.Component>
            {showHelp && (
              <Flag.Component className="u-text-right u-els-padding-left-4x ">
                <HelpButton color="blue" />
              </Flag.Component>
            )}
            {showLogout && (
              <Flag.Component className="u-text-right u-els-padding-left-1x">
                <LogoutButton />
              </Flag.Component>
            )}
          </Flag.Component>
        </Flag.Component>
      </Flag.Flag>
    </div>
  )
}

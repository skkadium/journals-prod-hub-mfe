import HelpButton from '../ui/HelpButton'
import Flag from '../layout/Flag'

/**
 * Toolbar Component
 *
 * @description
 * A component that represents the toolbar at the top of the page.
 *
 * @returns {JSX.Element} - The rendered toolbar.
 */
const Toolbar = () => {
  return (
    <div className="c-toolbar">
      <Flag.Flag className="u-fill-height">
        <Flag.Body>
          <div className="c-toolbar-header">
            <h2 className="c-toolbar-header__text">PPE Web Application</h2>
          </div>
        </Flag.Body>
        <Flag.Component className="u-text-right">
          <HelpButton color="blue" />
        </Flag.Component>
      </Flag.Flag>
    </div>
  )
}

export default Toolbar

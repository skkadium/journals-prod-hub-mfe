import { configureAxios } from '../api/configureAxios'
import PersonView from '../components/person/PersonView'
import Toolbar from '../components/toolbar/Toolbar'

// Configure Axios with a callback function to handle unauthorized requests.
// If a request is unauthorized, the function will remove the onbeforeunload event handler and reload the page.
configureAxios({
  onBffUnauthorized: () => {
    window.onbeforeunload = null
    window.location.reload()
  }
})

/**
 * AppRoot Component
 *
 * @description
 * The root component of the application. It renders different components based on the secure state.
 *
 * @returns {JSX.Element}
 * A React Element representing the root of the application UI.
 */
const AppRoot = () => {
  return (
    <div className="c-app-container">
      <div className="c-app-container__toolbar">
        <Toolbar />
      </div>
      <div className="c-app-container__content reverse_column">
        <PersonView />
      </div>
    </div>
  )
}

export default AppRoot

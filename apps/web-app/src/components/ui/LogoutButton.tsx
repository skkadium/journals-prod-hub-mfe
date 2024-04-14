import { Icon } from '@els/els-react--icon'
import { useLogout } from '../../hooks/useLogout'

const LogoutButton = () => {
  const { onLogout } = useLogout()
  return (
    <button>
      <Icon
        title="Log out"
        aria-label="Log out"
        sprite="LogOut"
        color="secondary"
        a11y={{ name: 'LogOut', description: 'LogOut icon' }}
        onClick={() => onLogout()}
        className="els-icon c-icon-button "
      />
    </button>
  )
}

export default LogoutButton

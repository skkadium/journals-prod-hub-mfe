import { config } from '@repo/app-config'
import { Icon } from '@els/els-react--icon'

interface HelpButtonProps {
  color: string
}

const HelpButton = ({ color }: HelpButtonProps) => {
  const onClick = () => window.open(config.webApp.helpUrl, '_blank')
  const className = `u-soft-left-sm c-icon-button c-icon-button--${color} c-icon-button--none`
  return (
    <div className="u-soft-left-sm">
      <Icon
        sprite="HelpOutlineCircle"
        color="secondary"
        aria-label="Help"
        title="Open Help"
        a11y={{ name: 'HelpOutlineCircle', description: 'Help Button' }}
        onClick={onClick}
        className={className}
      ></Icon>
    </div>
  )
}

export default HelpButton

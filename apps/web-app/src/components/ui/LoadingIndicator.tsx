import { ReactComponent as SpinnerIcon } from '../../assets/icons/spinner.svg'
const LoadingIndicator = () => (
  <div className="c-loading-indicator">
    <div className="c-loading-indicator__inner">
      <SpinnerIcon className="c-icon c-icon--xl" />
    </div>
  </div>
)

export default LoadingIndicator

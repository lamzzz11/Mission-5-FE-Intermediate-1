import googleIcon from '../../assets/icons/google.svg'
import Button from '../button.jsx'
import SocialButton from './socialButton.jsx'

export default function AuthActions({ submitLabel, secondaryLabel, onSecondaryClick, socialLabel }) {
  return (
    <>
      <div className="auth__actions">
        <Button type="submit" fullWidth>
          {submitLabel}
        </Button>
        <Button variant="secondary" fullWidth onClick={onSecondaryClick}>
          {secondaryLabel}
        </Button>
      </div>

      <div className="auth__divider">
        <span>atau</span>
      </div>

      <SocialButton icon={googleIcon} label={socialLabel} />
    </>
  )
}

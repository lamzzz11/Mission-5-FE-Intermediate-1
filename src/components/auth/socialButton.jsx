import Button from '../button.jsx'

export default function SocialButton({ icon, label, onClick }) {
  return (
    <Button variant="outline" fullWidth onClick={onClick}>
      <img src={icon} alt="" />
      {label}
    </Button>
  )
}

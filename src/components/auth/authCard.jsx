import Navbar from '../navbar.jsx'

export default function AuthCard({ title, subtitle, onSubmit, children }) {
  return (
    <>
      <Navbar showMenu={false} />
      <main className="auth">
        <div className="auth__card">
          <div className="auth__header">
            <h1 className="auth__title">{title}</h1>
            <p className="auth__subtitle">{subtitle}</p>
          </div>
          <form className="auth__form" onSubmit={onSubmit}>
            {children}
          </form>
        </div>
      </main>
    </>
  )
}

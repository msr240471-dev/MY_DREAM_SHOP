import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { BrandLockup } from '../components/StoreChrome'
import { useStore } from '../context/StoreContext'
import { authenticateAdminDemo } from '../services/authService'

export default function AdminLoginPage() {
  const { user, setUser, notify } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  if (user?.role === 'admin') return <Navigate to="/admin" replace />

  const update = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
    setError('')
  }
  const submit = event => {
    event.preventDefault()
    try {
      const admin = authenticateAdminDemo(form)
      setUser(admin)
      notify('Welcome, Rana.')
      navigate('/admin', { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    }
  }

  return <main className="admin-login-page">
    <section className="admin-login-story" aria-label="SNEAKERS WORLD BY RANA">
      <BrandLockup className="admin-login-brand" />
      <div className="admin-login-story-copy">
        <span className="admin-login-kicker"><i /> STORE MANAGEMENT</span>
        <h1>STEP INTO<br /><em>YOUR WORLD.</em></h1>
        <p>One place to manage orders, products and every next step.</p>
        <span className="admin-login-location">DHAKA, BANGLADESH <b>·</b> EST. 2026</span>
      </div>
      <span className="admin-login-orbit" aria-hidden="true">SW<span>·</span>R</span>
    </section>
    <section className="admin-login-panel">
      <div className="admin-login-form-wrap">
        <span className="eyebrow">ADMINISTRATOR ACCESS</span>
        <h2>Welcome back, Rana.</h2>
        <p>Sign in to your store dashboard.</p>
        <form className="admin-login-form" onSubmit={submit}>
          <label htmlFor="admin-login-email">EMAIL ADDRESS</label>
          <input id="admin-login-email" name="email" type="email" autoComplete="username" value={form.email} onChange={update} placeholder="admin@gmail.com" required />
          <label htmlFor="admin-login-password">PASSWORD</label>
          <div className="admin-password-field">
            <input id="admin-login-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={form.password} onChange={update} placeholder="Enter your password" required />
            <button type="button" onClick={() => setShowPassword(visible => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {error && <p className="admin-login-error" role="alert">{error}</p>}
          <button className="button button-orange button-full admin-login-submit">SIGN IN TO DASHBOARD <ArrowRight size={16} /></button>
        </form>
        <div className="admin-login-demo"><ShieldCheck size={17} /><div><b>Demo authentication only</b><span>Email: admin@gmail.com<br />Password: rana1234</span></div></div>
        <p className="admin-login-security"><LockKeyhole size={13} /> Demo credentials and access are browser-only, not production security.</p>
        <a className="admin-login-back" href="/">← BACK TO THE STORE</a>
      </div>
    </section>
  </main>
}

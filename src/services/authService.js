export const ADMIN_EMAIL = 'admin@gmail.com'
export const ADMIN_PASSWORD = 'rana1234'

export function authenticateDemo({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase()
  if (password.length < 6) throw new Error('Use at least 6 characters for your demo password.')
  if (normalizedEmail === ADMIN_EMAIL) throw new Error('Use the Admin Login page for this email.')
  return {
    name: name || normalizedEmail.split('@')[0],
    email: normalizedEmail,
    role: 'customer',
    address: '',
  }
}

export function authenticateAdminDemo({ email, password }) {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    throw new Error('The email or password is incorrect.')
  }
  return {
    name: 'Rana',
    email: ADMIN_EMAIL,
    role: 'admin',
    address: '',
  }
}

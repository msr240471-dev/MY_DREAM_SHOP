import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toast } from '../components/StoreChrome'

export default function AdminLayout() {
  const { pathname } = useLocation()
  useEffect(() => {
    const page = pathname === '/admin/login' ? 'Admin Login' : pathname.includes('/orders/') ? 'Order Details' : 'Admin'
    document.title = `${page} — SNEAKERS WORLD BY RANA`
    window.scrollTo(0, 0)
  }, [pathname])
  return <><Outlet /><Toast /></>
}

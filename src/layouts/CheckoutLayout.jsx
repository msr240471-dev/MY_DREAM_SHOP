import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Toast } from '../components/StoreChrome'

export default function CheckoutLayout() {
  const location = useLocation()
  useEffect(() => {
    document.title = location.pathname === '/checkout' ? 'Checkout — SNEAKERS WORLD BY RANA' : 'Order confirmed — SNEAKERS WORLD BY RANA'
    window.scrollTo(0, 0)
  }, [location.pathname])
  return <><Outlet /><Toast /></>
}

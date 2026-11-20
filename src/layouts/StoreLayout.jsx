import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Footer, Header, ScrollTop, Toast } from '../components/StoreChrome'

export default function StoreLayout() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const current = location.pathname === '/' ? 'STEP INTO YOUR WORLD.' : location.pathname.split('/').filter(Boolean).pop().replaceAll('-', ' ')
    document.title = `${current.charAt(0).toUpperCase()}${current.slice(1)} — SNEAKERS WORLD BY RANA`
  }, [location.pathname])
  return <><Header /><main><Outlet /></main><Footer /><Toast /><ScrollTop /></>
}

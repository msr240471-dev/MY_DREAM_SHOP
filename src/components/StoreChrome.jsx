import { useEffect, useState } from 'react'
import { ArrowRight, Check, ChevronDown, GitCompareArrows, Heart, Instagram, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { money } from '../data/products'
import { useStore } from '../context/StoreContext'

const links = [
  ['Shop all', '/shop'], ['Sneakers', '/sneakers'], ['Running', '/running-shoes'],
  ['Casual', '/casual-shoes'], ['Sports', '/sports-shoes'], ['Sandals', '/sandals'],
  ['New arrivals', '/new-arrivals'], ['Best sellers', '/best-sellers'],
]

export function BrandLockup({ className = '' }) {
  return <Link to="/" className={`brand-lockup brand-main ${className}`} aria-label="SNEAKERS WORLD BY RANA home">
    <span className="brand-mark">W</span>
    <span className="brand-title">SNEAKERS WORLD<small>BY RANA</small></span>
  </Link>
}

export function Header() {
  const { cart, products, wishlist, comparison, user, removeFromCart, updateQuantity } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const count = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + (products.find(p => p.id === item.productId)?.price || 0) * item.quantity, 0)
  return <>
    <div className="announcement"><span>COMPLIMENTARY DELIVERY ON ORDERS OVER ৳8,000</span><span className="announcement-note">Designed for the way you move.</span></div>
    <header className="site-header">
      <button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      <BrandLockup />
      <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
        {links.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(true)}><Search /></button>
        <Link className="icon-button wishlist-link" to="/wishlist" aria-label="Wishlist"><Heart />{wishlist.length > 0 && <i>{wishlist.length}</i>}</Link>
        <Link className="icon-button compare-header-link" to="/compare" aria-label="Compare products"><GitCompareArrows />{comparison.length > 0 && <i>{comparison.length}</i>}</Link>
        <button className="icon-button bag-trigger" aria-label="Shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag /><i>{count}</i></button>
        <Link to={user?.role === 'admin' ? '/admin' : user ? '/profile' : '/account'} className="account-link">{user?.role === 'admin' ? 'ADMIN' : user ? 'ACCOUNT' : 'SIGN IN'}</Link>
      </div>
    </header>
    {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    {cartOpen && <div className="drawer-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setCartOpen(false)}>
      <aside className="cart-drawer">
        <div className="drawer-heading"><h2>Your bag <span>({count})</span></h2><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>
        {!cart.length ? <div className="drawer-empty"><ShoppingBag size={36} /><p>Your next favorite is waiting.</p><Link to="/shop" className="button button-dark" onClick={() => setCartOpen(false)}>Explore the collection</Link></div> :
          <><div className="drawer-items">{cart.map(item => {
            const product = products.find(p => p.id === item.productId)
            if (!product) return null
            return <div className="drawer-item" key={item.key}><img src={product.images[0]} alt="" /><div className="drawer-item-copy"><Link to={`/product/${product.id}`} onClick={() => setCartOpen(false)}>{product.name}</Link><span>Size {item.size} · {item.color}</span><strong>{money(product.price)}</strong><div className="quantity-control"><button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity">+</button><button className="remove-link" onClick={() => removeFromCart(item.key)}>Remove</button></div></div></div>
          })}</div><div className="drawer-bottom"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and discounts calculated at checkout.</p><Link to="/checkout" className="button button-orange button-full" onClick={() => setCartOpen(false)}>Continue to checkout <ArrowRight size={17} /></Link><Link to="/cart" className="view-cart" onClick={() => setCartOpen(false)}>View bag</Link></div></>}
      </aside>
    </div>}
  </>
}

function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')
  const { products } = useStore()
  const navigate = useNavigate()
  const results = products.filter(product => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
  useEffect(() => {
    const handleKey = event => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])
  return <div className="search-overlay">
    <div className="search-top"><BrandLockup /><button className="icon-button" onClick={onClose} aria-label="Close search"><X /></button></div>
    <div className="search-content"><span className="eyebrow">WHAT ARE YOU LOOKING FOR?</span><div className="search-input-wrap"><Search /><input autoFocus placeholder="Search styles, brands, categories..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && navigate(`/shop?search=${encodeURIComponent(query)}`)} /><button onClick={() => { navigate(`/shop?search=${encodeURIComponent(query)}`); onClose() }}>SEARCH</button></div>
      <div className="search-suggestions">{query ? results.map(product => <Link key={product.id} to={`/product/${product.id}`} onClick={onClose}><img src={product.images[0]} alt="" /><span>{product.name}<small>{product.category} · {money(product.price)}</small></span><ArrowRight size={16} /></Link>) : <p>Popular: <button onClick={() => setQuery('running')}>Running</button><button onClick={() => setQuery('court')}>Court</button><button onClick={() => setQuery('sandals')}>Sandals</button></p>}</div>
    </div>
  </div>
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><BrandLockup /><p>Good shoes take you good places.<br />Find your next step with us.</p><a href="https://instagram.com" className="social-link" aria-label="Instagram"><Instagram size={17} /> FOLLOW OUR JOURNEY</a></div>
      <div className="footer-column"><span className="eyebrow">EXPLORE</span><Link to="/shop">Shop all</Link><Link to="/new-arrivals">New arrivals</Link><Link to="/best-sellers">Best sellers</Link><Link to="/size-guide">Shoe size guide</Link><Link to="/about">Our story</Link></div>
      <div className="footer-column"><span className="eyebrow">WE'RE HERE</span><Link to="/contact">Contact us</Link><Link to="/faq">FAQs</Link><Link to="/profile">Your account</Link><span>Dhaka, Bangladesh</span></div>
      <div className="footer-newsletter"><span className="eyebrow">A LITTLE GOOD NEWS</span><h3>Good things,<br />straight to your inbox.</h3><form onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSubscribed(true) }}><input type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} required /><button aria-label="Subscribe"><ArrowRight size={18} /></button></form>{subscribed ? <small><Check size={14} /> You're on the list. Welcome!</small> : <small>New drops, fresh perspectives. No noise.</small>}</div>
    </div>
    <div className="footer-bottom"><span>© 2026 SNEAKERS WORLD BY RANA.</span><div><span>Demo checkout</span><span>BDT ৳</span><Link to="/admin/login">Admin Login</Link></div><span>STEP INTO YOUR WORLD.</span></div>
  </footer>
}

export function Toast() {
  const { toast } = useStore()
  return toast ? <div className="toast-message"><Check size={17} />{toast}</div> : null
}

export function ScrollTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return visible ? <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">↑</button> : null
}

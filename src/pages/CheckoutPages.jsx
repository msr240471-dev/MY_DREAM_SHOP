import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, LockKeyhole, MapPin, PackageCheck } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { money } from '../data/products'
import { useStore } from '../context/StoreContext'
import { BrandLockup } from '../components/StoreChrome'

export function CheckoutPage() {
  const { cart, products, placeOrder, notify, appliedCoupon, applyCoupon } = useStore()
  const [couponCode, setCouponCode] = useState('')
  const navigate = useNavigate()
  const [payment, setPayment] = useState('Cash on Delivery')
  const subtotal = cart.reduce((total, item) => total + (products.find(p => p.id === item.productId)?.previousPrice || 0) * item.quantity, 0)
  const productDiscount = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId)
    return total + Math.max(0, (product?.previousPrice || 0) - (product?.price || 0)) * item.quantity
  }, 0)
  const couponDiscount = appliedCoupon ? Math.round((subtotal - productDiscount) * appliedCoupon.percent / 100) : 0
  const discount = productDiscount + couponDiscount
  const discountedSubtotal = subtotal - discount
  const delivery = discountedSubtotal >= 8000 || !discountedSubtotal ? 0 : 120
  const total = discountedSubtotal + delivery
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', district: '', city: '', postal: '' })
  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  const submit = event => {
    event.preventDefault()
    if (!cart.length) return notify('Your bag is empty. Add a pair before checking out.')
    const order = placeOrder({ customer: form, payment, subtotal, delivery, discount, total, coupon: appliedCoupon?.code || '' })
    navigate('/order-success', { state: { order } })
  }
  if (!cart.length) return <div className="standard-page"><div className="empty-state"><span>YOUR NEXT STEP STARTS HERE</span><h2>Your bag is taking a breather.</h2><p>Add something good before checking out.</p><Link className="button button-dark" to="/shop">EXPLORE THE COLLECTION <ArrowRight size={15} /></Link></div></div>
  return <div className="checkout-page">
    <div className="checkout-top"><BrandLockup /><span><LockKeyhole size={13} /> DEMO CHECKOUT · NO PAYMENT</span></div>
    <div className="checkout-breadcrumb"><Link to="/cart"><ArrowLeft size={14} /> BACK TO BAG</Link><span>INFORMATION</span><i>/</i><b>DELIVERY & PAYMENT</b></div>
    <div className="checkout-layout"><form className="checkout-form" onSubmit={submit}>
      <div className="checkout-section-title"><div><span className="step-number">01</span><h2>Your details</h2></div><Link to="/account">Already a member? Sign in</Link></div>
      <div className="form-grid"><label className="span-two">FULL NAME<input name="name" value={form.name} onChange={update} placeholder="Your full name" required /></label><label>EMAIL ADDRESS<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required /></label><label>PHONE NUMBER<input name="phone" type="tel" value={form.phone} onChange={update} placeholder="+880 1XXX-XXXXXX" minLength="8" required /></label></div>
      <div className="checkout-section-title address-title"><div><span className="step-number">02</span><h2>Delivery address</h2></div></div>
      <div className="form-grid"><label className="span-two">STREET ADDRESS<input name="address" value={form.address} onChange={update} placeholder="House, road, area" required /></label><label>DISTRICT<select name="district" value={form.district} onChange={update} required><option value="">Select district</option>{['Dhaka','Chattogram','Sylhet','Rajshahi','Khulna','Barishal','Rangpur','Mymensingh','Cumilla','Cox’s Bazar'].map(item => <option key={item}>{item}</option>)}</select></label><label>CITY / AREA<input name="city" value={form.city} onChange={update} placeholder="e.g. Dhanmondi" required /></label><label>POSTAL CODE<input name="postal" value={form.postal} onChange={update} placeholder="1209" inputMode="numeric" required /></label></div>
      <div className="checkout-section-title payment-title"><div><span className="step-number">03</span><h2>Payment method</h2></div></div>
      <div className="payment-options">{['Cash on Delivery','bKash (Demo)','Nagad (Demo)','Card Payment (Demo)'].map((method, index) => <label className={payment === method ? 'payment-option payment-selected' : 'payment-option'} key={method}><input type="radio" name="payment" value={method} checked={payment === method} onChange={() => setPayment(method)} /><span className="custom-radio" /><span>{method}<small>{index ? 'Simulation only — no real payment will be taken.' : 'Pay in cash when your order arrives.'}</small></span>{index > 0 && <b>DEMO</b>}</label>)}</div>
      <div className="checkout-coupon"><label htmlFor="checkout-coupon">COUPON CODE</label><div><input id="checkout-coupon" value={couponCode} onChange={event => setCouponCode(event.target.value)} placeholder="Try RANA10 or STEP15" /><button type="button" className="button button-light-outline" onClick={() => applyCoupon(couponCode)}>APPLY</button></div>{appliedCoupon && <small>{appliedCoupon.code} applied · {appliedCoupon.percent}% off merchandise.</small>}</div>
      <div className="demo-notice"><Check size={16} /><span><b>Demo checkout.</b> This creates a sample order only. No payment is processed and no delivery is arranged.</span></div>
      <button className="button button-orange button-full checkout-submit">PLACE MY ORDER — {money(total)} <ArrowRight size={16} /></button>
    </form><aside className="checkout-summary"><h2>Your good choice <span>({cart.reduce((sum, item) => sum + item.quantity, 0)})</span></h2><div className="summary-products">{cart.map(item => { const product = products.find(p => p.id === item.productId); return product ? <div className="summary-product" key={item.key}><div className="summary-photo"><img src={product.images[0]} alt={product.name} /><b>{item.quantity}</b></div><div><strong>{product.name}</strong><span>EU {item.size} · {item.color}</span></div><b>{money(product.price * item.quantity)}</b></div> : null })}</div><div className="summary-total"><div><span>Subtotal</span><span>{money(subtotal)}</span></div><div><span>Discount</span><span>{discount ? `−${money(discount)}` : money(0)}</span></div><div><span>Delivery</span><span>{delivery ? money(delivery) : 'Complimentary'}</span></div><div className="total-row"><b>Total</b><strong>{money(total)}</strong></div><p>All prices shown in Bangladeshi Taka (BDT).</p></div><div className="checkout-promise"><PackageCheck size={17} /> Easy 7-day size exchange</div></aside></div>
    <div className="checkout-footer">SNEAKERS WORLD BY RANA · Demo experience · <Link to="/faq">Need a hand?</Link></div>
  </div>
}

export function OrderSuccessPage() {
  const { state } = useLocation()
  const { orders } = useStore()
  const order = state?.order || orders[0]
  if (!order) return <div className="standard-page"><div className="empty-state"><span>NO RECENT ORDER</span><h2>Let's find your next step.</h2><Link to="/shop" className="button button-dark">SHOP SNEAKERS WORLD</Link></div></div>
  return <div className="success-page"><div className="success-card"><div className="success-icon"><Check size={28} /></div><span className="eyebrow">THAT'S A GOOD CHOICE</span><h1>You're all <em>set.</em></h1><p>Thanks, {order.customer?.name || 'there'}. Your demo order is in the books.</p><div className="success-order"><div><span>ORDER NUMBER</span><b>{order.id}</b></div><div><span>ORDER TOTAL</span><b>{money(order.total)}</b></div><div><span>PAYMENT</span><b>{order.payment}</b></div></div><div className="success-demo-note"><MapPin size={16} /><span>This is a demo order. No payment was taken and nothing will be shipped.</span></div><Link to="/shop" className="button button-dark">KEEP EXPLORING <ArrowRight size={15} /></Link><Link to="/profile" className="success-account">VIEW ORDER HISTORY</Link></div><div className="success-confetti">SNEAKERS WORLD BY RANA <span>·</span> STEP INTO YOUR WORLD.</div></div>
}

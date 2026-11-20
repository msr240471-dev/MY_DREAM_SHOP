import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, GitCompareArrows, SlidersHorizontal, Truck, X } from 'lucide-react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { categories, money } from '../data/products'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'

const heroImage = 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1900&q=90'

export function HomePage() {
  const { products, recentlyViewed } = useStore()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const trending = products.filter(product => product.featured).slice(0, 4)
  const arrivals = products.filter(product => product.created).slice(4, 8)
  const sellers = products.filter(product => product.bestSeller).slice(0, 4)
  return <div>
    <section className="home-hero">
      <img className="hero-image" src={heroImage} alt="Colorful premium sneakers in a dramatic studio" />
      <div className="hero-shade" />
      <div className="hero-content"><span className="hero-kicker"><i /> SNEAKERS WORLD BY RANA</span><h1>STEP INTO<br /><em>YOUR WORLD.</em></h1><p>Made for wherever life takes you.<br />Meet the shoes that move with you.</p><Link to="/shop" className="button button-orange">SHOP THE COLLECTION <ArrowRight size={16} /></Link><span className="hero-index">01 <i /> 03</span></div>
      <div className="hero-side-note">BUILT FOR YOUR EVERYDAY <span>—</span> DHAKA · BANGLADESH</div>
      <div className="hero-caption">MOVE DIFFERENT.</div>
    </section>
    <div className="home-strip"><span>FREE DELIVERY OVER ৳8,000</span><i /><span>MADE FOR ALL-DAY COMFORT</span><i /><span>YOUR NEW FAVORITE IS HERE</span></div>
    <section className="section-wrap category-section">
      <div className="section-heading"><div><span className="eyebrow">FIND YOUR FIT</span><h2>Made to move <em>your way.</em></h2></div><Link to="/shop" className="text-link">VIEW ALL CATEGORIES <ArrowUpRight size={15} /></Link></div>
      <div className="category-grid">{categories.map((category, i) => <Link className={`category-tile category-tile-${i}`} to={`/${category.slug}`} key={category.slug}><img src={category.image} alt={category.name} /><span className="category-count">{category.count}</span><div><h3>{category.name}</h3><span>EXPLORE <ArrowUpRight size={14} /></span></div></Link>)}</div>
    </section>
    <section className="section-wrap products-section">
      <div className="section-heading"><div><span className="eyebrow">THE GOOD STUFF</span><h2>Trending <em>right now.</em></h2></div><Link to="/shop" className="text-link">SHOP ALL <ArrowRight size={15} /></Link></div>
      <div className="product-grid">{trending.map(product => <ProductCard key={product.id} product={product} />)}</div>
    </section>
    <section className="editorial-banner"><img src="https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1800&q=85" alt="Neutral sneaker studio editorial" /><div className="editorial-shade" /><div className="editorial-copy"><span className="eyebrow">THE DAILY ROTATION</span><h2>More than a<br />good-looking shoe.</h2><p>Comfort you can count on.<br />Style you don't have to think about.</p><Link to="/casual-shoes" className="button button-light">MEET YOUR EVERYDAY <ArrowRight size={15} /></Link></div><span className="editorial-stamp">GOOD<br />FORM<br /><b>·</b> 01</span></section>
    <section className="section-wrap products-section arrival-section"><div className="section-heading"><div><span className="eyebrow">FRESH OFF THE LINE</span><h2>New in. <em>All you.</em></h2></div><Link to="/new-arrivals" className="text-link">ALL NEW ARRIVALS <ArrowRight size={15} /></Link></div><div className="product-grid">{arrivals.map(product => <ProductCard key={product.id} product={product} />)}</div></section>
    <section className="discount-banner"><div className="discount-mark">SWR<span>.</span></div><div><span className="eyebrow">A LITTLE SOMETHING EXTRA</span><h2>Good steps.<br /><em>Better prices.</em></h2><p>Take 15% off selected styles. Because a little extra goes a long way.</p><Link to="/shop" className="button button-dark">SHOP THE SALE <ArrowRight size={15} /></Link></div><div className="discount-code">STEP<br /><span>IN</span><br />15%</div></section>
    <section className="section-wrap products-section best-section"><div className="section-heading"><div><span className="eyebrow">THE ONES YOU LOVE</span><h2>Best sellers. <em>For a reason.</em></h2></div><Link to="/best-sellers" className="text-link">SHOP BEST SELLERS <ArrowRight size={15} /></Link></div><div className="product-grid">{sellers.map(product => <ProductCard key={product.id} product={product} />)}</div></section>
    {recentlyViewed.length > 0 && <section className="section-wrap products-section"><div className="section-heading"><div><span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span><h2>Recently <em>viewed.</em></h2></div></div><div className="product-grid">{recentlyViewed.map(id => products.find(product => product.id === id)).filter(Boolean).slice(0, 4).map(product => <ProductCard key={product.id} product={product} compact />)}</div></section>}
    <section className="testimonial-section"><span className="eyebrow">KIND WORDS, GOOD COMPANY</span><h2>“Feels like these were<br />made <em>just for me.</em>”</h2><div className="testimonial-stars">★★★★★</div><p>My new everyday pair. The comfort is unreal and they go with absolutely everything.</p><span className="testimonial-name">NUSRAT J. <i>·</i> VERIFIED CUSTOMER, DHAKA</span><div className="testimonial-dots"><b /><i /><i /></div></section>
    <section className="newsletter-section"><div><span className="eyebrow">GOOD THINGS, OCCASIONALLY</span><h2>Let's keep in <em>step.</em></h2><p>New drops, first dibs and the occasional good thing.<br />No clutter. Promise.</p></div><form onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSubscribed(true) }}><label htmlFor="home-email">YOUR EMAIL ADDRESS</label><div><input id="home-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required /><button className="button button-dark">{subscribed ? <><Check size={15} /> YOU'RE IN</> : <>COUNT ME IN <ArrowRight size={15} /></>}</button></div><small>By subscribing, you agree to receive occasional SNEAKERS WORLD news.</small></form></section>
  </div>
}

const routeCategory = pathname => ({
  '/sneakers': 'Sneakers', '/running-shoes': 'Running Shoes', '/casual-shoes': 'Casual Shoes',
  '/sports-shoes': 'Sports Shoes', '/sandals': 'Sandals',
}[pathname])

export function ProductListingPage({ mode = 'all' }) {
  const { products, comparison } = useStore()
  const location = window.location.pathname
  const category = routeCategory(location)
  const [params, setParams] = useSearchParams()
  const [brand, setBrand] = useState('')
  const [size, setSize] = useState('')
  const [maxPrice, setMaxPrice] = useState(20000)
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const search = params.get('search') || ''
  const isNew = mode === 'new'
  const isBest = mode === 'best'
  const title = category || (isNew ? 'New arrivals' : isBest ? 'Best sellers' : 'Shop all')
  const filtered = useMemo(() => {
    let result = products.filter(product => (!category || product.category === category)
      && (!isNew || product.created)
      && (!isBest || product.bestSeller)
      && (!brand || product.brand === brand)
      && (!size || product.sizes.includes(Number(size)))
      && product.price <= maxPrice
      && (!search || search.toLowerCase().trim().split(/\s+/).every(term => `${product.name} ${product.brand} ${product.category} ${product.colors.join(' ')} ${product.description}`.toLowerCase().includes(term))))
    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'popular') result = [...result].sort((a, b) => b.reviewCount - a.reviewCount)
    if (sort === 'featured') result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured))
    return result
  }, [products, category, isNew, isBest, brand, size, maxPrice, sort, search])
  return <div className="listing-page">
    <div className="listing-hero"><span className="eyebrow">SNEAKERS WORLD BY RANA COLLECTION</span><h1>{title}<span>.</span></h1><p>Good shoes, thoughtfully made. Find the pair that feels like you.</p><div className="listing-breadcrumb"><Link to="/">HOME</Link><i>/</i> {title.toUpperCase()}</div></div>
    <div className="listing-toolbar"><span>{filtered.length} styles to make your own</span><div><button className="filter-toggle" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={15} /> FILTERS</button><label>SORT BY <select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="popular">Most popular</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div></div>
    <div className="listing-layout">
      <aside className={`filter-panel ${filtersOpen ? 'filters-open' : ''}`}><div className="filter-title">FILTER BY <button onClick={() => { setBrand(''); setSize(''); setMaxPrice(20000); setParams({}) }}>CLEAR ALL</button></div><label className="filter-label">CATEGORY</label><div className="filter-options">{[['Shop all','/shop'],['Sneakers','/sneakers'],['Running shoes','/running-shoes'],['Casual shoes','/casual-shoes'],['Sports shoes','/sports-shoes'],['Sandals','/sandals']].map(([label, path])=><Link className={location === path ? 'filter-active' : ''} key={path} to={path}>{label}</Link>)}</div><label className="filter-label" htmlFor="brand-filter">BRAND</label><select className="filter-select" id="brand-filter" value={brand} onChange={e => setBrand(e.target.value)}><option value="">All brands</option>{[...new Set(products.map(product => product.brand))].map(item => <option key={item}>{item}</option>)}</select><label className="filter-label" htmlFor="size-filter">EU SIZE</label><select className="filter-select" id="size-filter" value={size} onChange={e => setSize(e.target.value)}><option value="">All sizes</option>{[...new Set(products.flatMap(product => product.sizes))].sort((a,b) => a-b).map(item => <option key={item} value={item}>{item}</option>)}</select><label className="filter-label" htmlFor="price-filter">PRICE <span>UP TO {money(maxPrice)}</span></label><input id="price-filter" type="range" min="2500" max="20000" step="500" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} /><div className="price-extremes"><span>৳2,500</span><span>৳20,000+</span></div><div className="filter-help">Complimentary delivery over ৳8,000</div></aside>
      <div className="listing-results">{search && <p className="search-result-label">Showing results for “{search}” <button onClick={() => setParams({})}>Clear</button></p>}{filtered.length ? <><div className="compare-selection">{comparison.length > 0 && <span>{comparison.length} selected for comparison</span>}<Link to="/compare">COMPARE PAIRS <GitCompareArrows size={14} /></Link></div><div className="product-grid listing-grid">{filtered.map(product => <ProductCard key={product.id} product={product} />)}</div></> : <div className="empty-state"><span>NO MATCHES, JUST YET.</span><h2>Try another search.</h2><p>Try adjusting your filters or exploring the full collection.</p><Link to="/shop" className="button button-dark">SHOP ALL</Link></div>}</div>
    </div>
  </div>
}

export function ProductPage() {
  const { id } = useParams()
  const { products, addToCart, notify, recordProductView } = useStore()
  const product = products.find(item => item.id === id)
  const [size, setSize] = useState(42)
  const [color, setColor] = useState(product?.colors[0] || '')
  const [activeImage, setActiveImage] = useState(0)
  useEffect(() => {
    document.title = product ? `${product.name} — SNEAKERS WORLD BY RANA` : 'Product not found — SNEAKERS WORLD BY RANA'
    if (product) recordProductView(product.id)
  }, [product])
  if (!product) return <NotFoundPage />
  const related = products.filter(item => item.id !== product.id && item.category === product.category).slice(0, 4)
  const fallbackImage = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
  return <div className="product-detail-page"><div className="product-breadcrumb"><Link to="/">HOME</Link> / <Link to="/shop">SHOP</Link> / {product.name.toUpperCase()}</div><div className="product-detail">
    <div className="product-gallery"><div className="gallery-thumbs">{product.images.map((image, index) => <button className={activeImage === index ? 'thumb-active' : ''} key={image} onClick={() => setActiveImage(index)}><img src={image} onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage }} alt={`View ${product.name} ${index + 1}`} /></button>)}</div><div className="gallery-main"><img src={product.images[activeImage]} onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage }} alt={product.name} /><span className="sale-tag">{product.discount ? `-${product.discount}%` : 'SNEAKERS WORLD EXCLUSIVE'}</span></div></div>
    <div className="product-detail-copy"><span className="eyebrow">{product.brand} · {product.category.toUpperCase()}</span><h1>{product.name}</h1><div className="detail-rating"><span>★★★★★</span> {product.rating} <i>({product.reviewCount} reviews)</i></div><div className="detail-price">{money(product.price)} {product.previousPrice > product.price && <del>{money(product.previousPrice)}</del>}</div><p className="detail-description">{product.description}</p><div className="detail-select"><div><span className="detail-label">COLOR <b>— {color}</b></span><div className="color-options">{product.colors.map((item, index) => <button key={item} className={color === item ? 'color-active' : ''} title={item} onClick={() => setColor(item)} style={{ '--swatch': ['#201f1e','#ece9df','#66816b','#b67457'][index % 4] }} />)}</div></div><button className="size-guide" onClick={() => notify('For the best fit, choose your usual EU size.')}>SIZE GUIDE <ArrowUpRight size={13} /></button></div><span className="detail-label">SELECT SIZE <b>— EU</b></span><div className="size-options">{product.sizes.map(item => <button key={item} className={size === item ? 'size-active' : ''} onClick={() => setSize(item)}>{item}</button>)}</div><button className="button button-dark button-full add-detail" onClick={() => addToCart(product, size, color)}>ADD TO BAG — {money(product.price)} <ArrowRight size={16} /></button><div className="product-benefits"><span><Truck size={16} /> Complimentary delivery over ৳8,000</span><span><Check size={15} /> Easy 7-day exchange</span></div><div className="detail-accordion"><details open><summary>THE DETAILS <ChevronDown size={16} /></summary><p>{product.description} Crafted with care for the long run. Designed to keep your day moving, wherever it takes you.</p></details><details><summary>DELIVERY & RETURNS <ChevronDown size={16} /></summary><p>Delivery in 2–4 business days in Dhaka and 3–6 days outside Dhaka. Easy size exchange within 7 days of receiving your order.</p></details><details><summary>REVIEWS <ChevronDown size={16} /></summary><p>Customers love the all-day comfort and thoughtful fit. Rated {product.rating} out of 5 by {product.reviewCount} happy wearers.</p></details></div></div>
  </div><section className="section-wrap related-section"><div className="section-heading"><div><span className="eyebrow">GOOD COMPANY</span><h2>Goes well with <em>your day.</em></h2></div></div><div className="product-grid">{related.map(item => <ProductCard key={item.id} product={item} />)}</div></section></div>
}

export function CartPage() {
  const { cart, products, updateQuantity, removeFromCart } = useStore()
  const subtotal = cart.reduce((total, item) => total + (products.find(p => p.id === item.productId)?.price || 0) * item.quantity, 0)
  return <div className="standard-page cart-page"><div className="page-intro"><span className="eyebrow">YOUR EDIT</span><h1>Your bag<span>.</span></h1></div>{!cart.length ? <div className="empty-state"><span>NOTHING IN HERE, YET.</span><h2>It's a good day to find your fit.</h2><p>That perfect pair is only a step away.</p><Link to="/shop" className="button button-dark">EXPLORE THE COLLECTION <ArrowRight size={15} /></Link></div> : <div className="cart-page-grid"><div>{cart.map(item => { const product = products.find(p => p.id === item.productId); if (!product) return null; return <div className="cart-line" key={item.key}><Link to={`/product/${product.id}`}><img src={product.images[0]} alt={product.name} /></Link><div><span className="eyebrow">{product.brand}</span><Link to={`/product/${product.id}`} className="cart-line-name">{product.name}</Link><p>Size {item.size} · {item.color}</p><div className="quantity-control"><button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity">+</button></div><button className="text-button" onClick={() => removeFromCart(item.key)}>REMOVE</button></div><strong>{money(product.price * item.quantity)}</strong></div>})}<Link to="/shop" className="continue-shopping">← KEEP EXPLORING</Link></div><aside className="order-summary"><h2>Good choice.</h2><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery</span><span>{subtotal >= 8000 ? 'Complimentary' : money(120)}</span></div><p>Taxes included. Delivery calculated at checkout.</p><Link to="/checkout" className="button button-orange button-full">CHECKOUT <ArrowRight size={15} /></Link><div className="secure-note"><Check size={14} /> Safe and secure demo checkout</div></aside></div>}</div>
}

export function WishlistPage() {
  const { products, wishlist } = useStore()
  const saved = products.filter(product => wishlist.includes(product.id))
  return <div className="standard-page"><div className="page-intro"><span className="eyebrow">YOUR SHORTLIST</span><h1>Saved for later<span>.</span></h1><p>{saved.length} styles with your name on them.</p></div>{saved.length ? <div className="product-grid wishlist-grid">{saved.map(product => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><span>A LITTLE SPACE FOR GREAT SHOES.</span><h2>Your wishlist is waiting.</h2><p>Tap the heart on anything you love to save it here.</p><Link to="/shop" className="button button-dark">FIND YOUR FAVORITE <ArrowRight size={15} /></Link></div>}</div>
}

export function NotFoundPage() {
  return <div className="not-found"><span>404 — WRONG TURN?</span><h1>Not all who wander<br /><em>are on the right page.</em></h1><p>Looks like this page took a different route.</p><Link className="button button-dark" to="/">BACK TO SNEAKERS WORLD <ArrowRight size={15} /></Link></div>
}

export function ProductComparisonPage() {
  const { products, comparison, toggleComparison } = useStore()
  const selected = comparison.map(id => products.find(product => product.id === id)).filter(Boolean)
  const rows = [
    ['Brand', product => product.brand],
    ['Category', product => product.category],
    ['Price', product => money(product.price)],
    ['Rating', product => `★ ${product.rating} (${product.reviewCount} reviews)`],
    ['Available sizes', product => product.sizes.join(', ')],
    ['Colors', product => product.colors.join(' / ')],
    ['Stock', product => `${product.stock} pairs`],
  ]
  return <div className="standard-page compare-page">
    <div className="page-intro"><span className="eyebrow">SIDE BY SIDE</span><h1>Compare pairs<span>.</span></h1><p>Choose up to three styles and compare the details.</p></div>
    {selected.length ? <div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>DETAIL</th>{selected.map(product => <th key={product.id}><img src={product.images[0]} alt={product.name} /><b>{product.name}</b><button onClick={() => toggleComparison(product.id)}>REMOVE</button></th>)}</tr></thead><tbody>{rows.map(([label, value]) => <tr key={label}><th>{label}</th>{selected.map(product => <td key={product.id}>{value(product)}</td>)}</tr>)}</tbody></table></div> : <div className="empty-state"><span>NOTHING TO COMPARE YET</span><h2>Pick a few favorites first.</h2><p>Use the comparison icon on any product card.</p><Link to="/shop" className="button button-dark">EXPLORE THE COLLECTION</Link></div>}
    <div className="compare-continue"><Link to="/shop" className="text-link">CONTINUE SHOPPING <ArrowRight size={14} /></Link></div>
  </div>
}

export function ProductReviewsPage() {
  const { id } = useParams()
  const { products, reviews, submitReview } = useStore()
  const product = products.find(item => item.id === id)
  const [form, setForm] = useState({ name: '', rating: '5', body: '' })
  if (!product) return <NotFoundPage />
  const productReviews = reviews[id] || []
  const submit = event => {
    event.preventDefault()
    if (submitReview(id, { ...form, rating: Number(form.rating) })) setForm({ name: '', rating: '5', body: '' })
  }
  return <div className="standard-page review-page">
    <div className="page-intro"><span className="eyebrow">{product.brand} · {product.category.toUpperCase()}</span><h1>Reviews for <em>{product.name}.</em></h1><p>Customer-submitted demo reviews are saved in this browser.</p></div>
    <form className="review-form" onSubmit={submit}>
      <label>Your name<input value={form.name} onChange={event => setForm(current => ({ ...current, name: event.target.value }))} required /></label>
      <label>Rating<select value={form.rating} onChange={event => setForm(current => ({ ...current, rating: event.target.value }))}>{[5, 4, 3, 2, 1].map(rating => <option key={rating} value={rating}>{rating} stars</option>)}</select></label>
      <label className="review-body">Your review<textarea value={form.body} onChange={event => setForm(current => ({ ...current, body: event.target.value }))} rows="4" required /></label>
      <button className="button button-dark">SUBMIT DEMO REVIEW <ArrowRight size={15} /></button>
    </form>
    <div className="review-list">{productReviews.length ? productReviews.map((review, index) => <article key={`${review.date}-${index}`}><div><b>{review.name}</b><span>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></div><p>{review.body}</p><small>{new Date(review.date).toLocaleDateString('en-BD')}</small></article>) : <div className="empty-state"><span>NO CUSTOMER REVIEWS YET</span><h2>Be the first to share.</h2><p>Tell other shoppers what you think of this pair.</p></div>}</div>
    <Link className="text-link" to={`/product/${product.id}`}>BACK TO PRODUCT <ArrowRight size={14} /></Link>
  </div>
}

export function SizeGuidePage() {
  const sizes = [[38, 5, 6, 24], [39, 6, 7, 24.5], [40, 6.5, 7.5, 25], [41, 7, 8, 26], [42, 8, 9, 26.5], [43, 9, 10, 27.5], [44, 9.5, 10.5, 28], [45, 10, 11, 29]]
  return <div className="standard-page size-guide-page"><div className="page-intro"><span className="eyebrow">FIND YOUR FIT</span><h1>Shoe size guide<span>.</span></h1><p>Measure from your heel to the tip of your longest toe. If between sizes, choose the larger fit.</p></div><div className="size-guide-table"><table><thead><tr><th>EU</th><th>UK</th><th>US</th><th>Foot length (cm)</th></tr></thead><tbody>{sizes.map(row => <tr key={row[0]}>{row.map(value => <td key={value}>{value}</td>)}</tr>)}</tbody></table></div><p className="size-guide-note">Sizing can vary slightly by style. Contact us if you need help choosing.</p><Link className="button button-dark" to="/shop">SHOP SHOES <ArrowRight size={15} /></Link></div>
}

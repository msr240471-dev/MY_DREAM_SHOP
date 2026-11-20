import { useState } from 'react'
import { ArrowRight, Eye, GitCompareArrows, Heart, Plus, Star, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { money } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function ProductCard({ product, compact = false }) {
  const { wishlist, toggleWishlist, addToCart, comparison, toggleComparison } = useStore()
  const [imageFailed, setImageFailed] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [size, setSize] = useState(42)
  const [color, setColor] = useState(product.colors[0])
  const saved = wishlist.includes(product.id)
  const fallback = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
  return <>
    <article className={`product-card group ${compact ? 'product-card-compact' : ''}`}>
      <div className="product-card-image">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <img className={imageLoaded ? 'image-loaded' : ''} src={imageFailed ? fallback : product.images[0]} onLoad={() => setImageLoaded(true)} onError={() => setImageFailed(true)} alt={product.name} loading="lazy" />
        </Link>
        {product.discount > 0 && <span className="sale-tag">-{product.discount}%</span>}
        {product.created && <span className="new-tag">NEW</span>}
        <button className={`wishlist-button ${saved ? 'is-saved' : ''}`} onClick={() => toggleWishlist(product.id)} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}>
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <button className={`compare-card-button ${comparison.includes(product.id) ? 'is-selected' : ''}`} onClick={() => toggleComparison(product.id)} aria-label={comparison.includes(product.id) ? 'Remove from comparison' : 'Add to comparison'}>
          <GitCompareArrows size={15} />
        </button>
        <div className="quick-actions">
          <button className="quick-add" onClick={() => addToCart(product, 42, product.colors[0])}><Plus size={15} /> Quick add</button>
          <button className="quick-view" onClick={() => setQuickViewOpen(true)}><Eye size={15} /> Quick view</button>
        </div>
      </div>
      <div className="product-card-copy">
        <div className="flex items-center justify-between gap-2"><span className="eyebrow">{product.brand}</span><span className="rating"><Star size={12} fill="currentColor" /> {product.rating}</span></div>
        <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        <p className="product-color">{product.category} <span>·</span> {product.colors.join(' / ')}</p>
        <div className="price-row"><strong>{money(product.price)}</strong>{product.previousPrice > product.price && <del>{money(product.previousPrice)}</del>}</div>
        <Link className="product-review-link" to={`/product/${product.id}/reviews`}>READ REVIEWS ({product.reviewCount})</Link>
      </div>
    </article>
    {quickViewOpen && <div className="quick-view-backdrop" onMouseDown={event => event.target === event.currentTarget && setQuickViewOpen(false)}><section className="quick-view-modal" role="dialog" aria-modal="true" aria-labelledby={`quick-title-${product.id}`}><button className="quick-view-close icon-button" onClick={() => setQuickViewOpen(false)} aria-label="Close quick view"><X /></button><img src={imageFailed ? fallback : product.images[0]} onError={() => setImageFailed(true)} alt={product.name} /><div className="quick-view-copy"><span className="eyebrow">{product.brand} · {product.category.toUpperCase()}</span><h2 id={`quick-title-${product.id}`}>{product.name}</h2><strong>{money(product.price)} {product.previousPrice > product.price && <del>{money(product.previousPrice)}</del>}</strong><p>{product.description}</p><label>COLOR — {color}<div className="quick-color-options">{product.colors.map(item => <button key={item} className={color === item ? 'quick-color-active' : ''} onClick={() => setColor(item)}>{item}</button>)}</div></label><label>SIZE — EU<div className="quick-size-options">{product.sizes.map(item => <button key={item} className={size === item ? 'quick-size-active' : ''} onClick={() => setSize(item)}>{item}</button>)}</div></label><button className="button button-dark button-full" onClick={() => { addToCart(product, size, color); setQuickViewOpen(false) }}>ADD TO BAG <ArrowRight size={15} /></button><Link className="quick-view-details" to={`/product/${product.id}`}>FULL DETAILS <ArrowRight size={13} /></Link></div></section></div>}
  </>
}

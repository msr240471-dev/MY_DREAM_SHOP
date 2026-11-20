import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { categories as initialCategories, products as initialProducts } from '../data/products'
import { ADMIN_EMAIL } from '../services/authService'

const StoreContext = createContext(null)
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => read('solehub-products', initialProducts))
  const [categories, setCategories] = useState(() => read('solehub-categories', initialCategories.map(category => category.name)))
  const [cart, setCart] = useState(() => read('solehub-cart', []))
  const [wishlist, setWishlist] = useState(() => read('solehub-wishlist', []))
  const [recentlyViewed, setRecentlyViewed] = useState(() => read('solehub-recently-viewed', []))
  const [comparison, setComparison] = useState(() => read('solehub-comparison', []))
  const [reviews, setReviews] = useState(() => read('solehub-reviews', {}))
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [user, setUser] = useState(() => {
    const storedUser = read('solehub-user', null)
    if (storedUser?.role === 'admin' && storedUser.email?.toLowerCase() !== ADMIN_EMAIL) return null
    return storedUser
  })
  const [orders, setOrders] = useState(() => read('solehub-orders', []))
  const [toast, setToast] = useState('')

  useEffect(() => localStorage.setItem('solehub-products', JSON.stringify(products)), [products])
  useEffect(() => localStorage.setItem('solehub-categories', JSON.stringify(categories)), [categories])
  useEffect(() => localStorage.setItem('solehub-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('solehub-wishlist', JSON.stringify(wishlist)), [wishlist])
  useEffect(() => localStorage.setItem('solehub-recently-viewed', JSON.stringify(recentlyViewed)), [recentlyViewed])
  useEffect(() => localStorage.setItem('solehub-comparison', JSON.stringify(comparison)), [comparison])
  useEffect(() => localStorage.setItem('solehub-reviews', JSON.stringify(reviews)), [reviews])
  useEffect(() => user ? localStorage.setItem('solehub-user', JSON.stringify(user)) : localStorage.removeItem('solehub-user'), [user])
  useEffect(() => localStorage.setItem('solehub-orders', JSON.stringify(orders)), [orders])
  useEffect(() => {
    const syncOrders = event => {
      if (event.key === 'solehub-orders') setOrders(read('solehub-orders', []))
    }
    window.addEventListener('storage', syncOrders)
    return () => window.removeEventListener('storage', syncOrders)
  }, [])
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 2800)
    return () => clearTimeout(timer)
  }, [toast])

  const notify = (message) => setToast(message)
  const addToCart = (product, size = 42, color = product.colors[0]) => {
    if (product.stock < 1) return notify('Sorry, this style is currently out of stock.')
    setCart(current => {
      const key = `${product.id}-${size}-${color}`
      const existing = current.find(item => item.key === key)
      return existing
        ? current.map(item => item.key === key ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item)
        : [...current, { key, productId: product.id, size, color, quantity: 1 }]
    })
    notify('Added to your bag')
  }
  const updateQuantity = (key, quantity) => {
    const item = cart.find(entry => entry.key === key)
    if (!item) return
    const stock = products.find(product => product.id === item.productId)?.stock ?? item.quantity
    const nextQuantity = Math.min(quantity, stock)
    if (nextQuantity < quantity) notify(`Only ${stock} pair${stock === 1 ? '' : 's'} available.`)
    setCart(items => nextQuantity < 1
      ? items.filter(entry => entry.key !== key)
      : items.map(entry => entry.key === key ? { ...entry, quantity: nextQuantity } : entry))
  }
  const removeFromCart = key => setCart(items => items.filter(item => item.key !== key))
  const toggleWishlist = id => {
    setWishlist(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id])
    notify(wishlist.includes(id) ? 'Removed from wishlist' : 'Saved to your wishlist')
  }
  const recordProductView = id => setRecentlyViewed(current => [id, ...current.filter(item => item !== id)].slice(0, 8))
  const toggleComparison = id => {
    setComparison(current => {
      const availableIds = current.filter(item => products.some(product => product.id === item))
      if (availableIds.includes(id)) return availableIds.filter(item => item !== id)
      if (availableIds.length >= 3) {
        notify('Compare up to 3 pairs at a time.')
        return availableIds
      }
      return [...availableIds, id]
    })
  }
  const applyCoupon = code => {
    const coupons = { RANA10: 10, STEP15: 15 }
    const normalizedCode = code.trim().toUpperCase()
    if (!coupons[normalizedCode]) {
      notify('That coupon code is not valid.')
      return false
    }
    setAppliedCoupon({ code: normalizedCode, percent: coupons[normalizedCode] })
    notify(`${normalizedCode} applied to your demo order.`)
    return true
  }
  const clearCoupon = () => setAppliedCoupon(null)
  const submitReview = (productId, review) => {
    const product = products.find(item => item.id === productId)
    if (!product || !review.name.trim() || !review.body.trim() || review.rating < 1 || review.rating > 5) {
      notify('Add your name, a rating and a review before submitting.')
      return false
    }
    setReviews(current => ({
      ...current,
      [productId]: [{ ...review, name: review.name.trim(), body: review.body.trim(), date: new Date().toISOString() }, ...(current[productId] || [])],
    }))
    notify('Thanks — your demo review has been added.')
    return true
  }
  const placeOrder = details => {
    let id
    do {
      id = `SWR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`
    } while (orders.some(order => order.id === id))
    const items = cart.map(item => {
      const product = products.find(entry => entry.id === item.productId)
      return {
        ...item,
        productName: product?.name || 'Removed product',
        brand: product?.brand || '',
        image: product?.images?.[0] || '',
        unitPrice: Number(product?.price || 0),
        lineTotal: Number(product?.price || 0) * item.quantity,
      }
    })
    const order = {
      ...details,
      id,
      date: new Date().toISOString(),
      status: 'Pending',
      isNew: true,
      items,
    }
    setOrders(current => [order, ...current])
    setProducts(current => current.map(product => {
      const orderedQuantity = cart.filter(item => item.productId === product.id).reduce((total, item) => total + item.quantity, 0)
      return orderedQuantity ? { ...product, stock: Math.max(0, product.stock - orderedQuantity) } : product
    }))
    setCart([])
    setAppliedCoupon(null)
    return order
  }
  const updateOrderStatus = (id, status) => {
    const order = orders.find(entry => entry.id === id)
    if (!order || order.status === status) return
    const quantities = order.items.reduce((totals, item) => {
      totals[item.productId] = (totals[item.productId] || 0) + item.quantity
      return totals
    }, {})
    if (order.status === 'Cancelled' && status !== 'Cancelled') {
      const insufficientStock = products.some(product => (quantities[product.id] || 0) > product.stock)
      if (insufficientStock) {
        notify('This order cannot be reopened because the required inventory is no longer available.')
        return
      }
      setProducts(current => current.map(product => quantities[product.id]
        ? { ...product, stock: product.stock - quantities[product.id] }
        : product))
    } else if (order.status !== 'Cancelled' && status === 'Cancelled') {
      setProducts(current => current.map(product => quantities[product.id]
        ? { ...product, stock: product.stock + quantities[product.id] }
        : product))
    }
    setOrders(current => current.map(entry => entry.id === id ? { ...entry, status } : entry))
    notify(`Order status updated to ${status}.`)
  }
  const value = useMemo(() => ({
    products, setProducts, categories, setCategories, cart, setCart, wishlist, recentlyViewed, comparison, reviews,
    appliedCoupon, user, setUser, orders, setOrders, toast,
    notify, addToCart, updateQuantity, removeFromCart, toggleWishlist, toggleComparison, recordProductView,
    applyCoupon, clearCoupon, submitReview, placeOrder, updateOrderStatus,
  }), [products, categories, cart, wishlist, recentlyViewed, comparison, reviews, appliedCoupon, user, orders, toast])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within StoreProvider')
  return context
}

import { useMemo, useState } from 'react'
import { ArrowLeft, Download, Package, Printer, Search, ShieldCheck } from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { money } from '../data/products'
import { useStore } from '../context/StoreContext'

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned']
const formatDate = date => new Date(date).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'short' })
const addressText = address => [address?.address, address?.city, address?.district, address?.postal].filter(Boolean).join(', ')
const csvCell = value => {
  const text = String(value ?? '')
  const safeText = /^[\t\r ]*[=+\-@]/.test(text) ? `'${text}` : text
  return `"${safeText.replaceAll('"', '""')}"`
}

export function AdminOrdersPanel({ orders, setOrders, updateOrderStatus }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const filteredOrders = useMemo(() => orders.filter(order => {
    const searchText = `${order.id} ${order.customer?.name} ${order.customer?.phone} ${order.customer?.email}`.toLowerCase()
    return searchText.includes(query.trim().toLowerCase()) && (statusFilter === 'All statuses' || order.status === statusFilter)
  }), [orders, query, statusFilter])

  const markSeen = () => {
    setOrders(current => current.map(order => order.isNew ? { ...order, isNew: false } : order))
  }
  const exportOrders = () => {
    const columns = ['Order ID', 'Date', 'Customer', 'Phone', 'Email', 'Address', 'Items', 'Subtotal', 'Discount', 'Delivery', 'Total', 'Payment', 'Status']
    const rows = filteredOrders.map(order => [
      order.id, order.date, order.customer?.name, order.customer?.phone, order.customer?.email,
      addressText(order.customer),
      order.items?.map(item => `${item.productName || item.name} (EU ${item.size}, ${item.color}) x${item.quantity}`).join('; '),
      order.subtotal, order.discount, order.delivery, order.total, order.payment, order.status,
    ])
    const content = [columns, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'sneakers-world-orders.csv'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  return <section className="admin-panel admin-table-panel">
    <div className="admin-table-heading">
      <div><span className="eyebrow">EVERY CUSTOMER ORDER</span><h2>Customer orders <small>{filteredOrders.length} of {orders.length}</small></h2></div>
      <div className="admin-order-heading-actions"><button className="button button-light-outline" onClick={exportOrders}><Download size={14} /> EXPORT CSV</button>{orders.some(order => order.isNew) && <button className="button button-light-outline" onClick={markSeen}>MARK NEW ORDERS SEEN</button>}</div>
    </div>
    <div className="admin-order-filters">
      <label><Search size={16} /><span className="visually-hidden">Search orders</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search order ID, customer or phone..." /></label>
      <label><span className="visually-hidden">Filter by order status</span><select value={statusFilter} onChange={event => setStatusFilter(event.target.value)}><option>All statuses</option>{ORDER_STATUSES.map(status => <option key={status}>{status}</option>)}</select></label>
    </div>
    {filteredOrders.length ? <div className="admin-table-scroll">
      <table className="admin-orders-table">
        <thead><tr><th>ORDER / DATE</th><th>CUSTOMER / PHONE</th><th>DELIVERY ADDRESS</th><th>PRODUCTS / SIZE / COLOR / QTY</th><th>TOTAL</th><th>PAYMENT</th><th>STATUS</th><th>DETAILS</th></tr></thead>
        <tbody>{filteredOrders.map(order => <tr key={order.id}>
          <td><Link className="admin-order-link" to={`/admin/orders/${encodeURIComponent(order.id)}`}>{order.id}</Link><small className="table-sub">{formatDate(order.date)}</small>{order.isNew && <span className="new-order-label">NEW</span>}</td>
          <td><b>{order.customer?.name || '—'}</b><small className="table-sub">{order.customer?.phone || 'No phone provided'}</small></td>
          <td>{addressText(order.customer) || '—'}</td>
          <td>{order.items?.map((item, index) => <div className="admin-order-item-summary" key={`${item.key || item.productId}-${index}`}><b>{item.productName || item.name || item.product?.name || 'Product'}</b><small>EU {item.size} · {item.color} · Qty {item.quantity}</small></div>)}</td>
          <td><b>{money(order.total)}</b></td>
          <td>{order.payment || '—'}</td>
          <td><select className="status-select" aria-label={`Status for order ${order.id}`} value={ORDER_STATUSES.includes(order.status) ? order.status : 'Pending'} onChange={event => updateOrderStatus(order.id, event.target.value)}>{ORDER_STATUSES.map(status => <option key={status}>{status}</option>)}</select></td>
          <td><Link to={`/admin/orders/${encodeURIComponent(order.id)}`} className="button button-light-outline order-details-link">View</Link></td>
        </tr>)}</tbody>
      </table>
    </div> : <div className="admin-empty-orders"><Package size={25} /><b>{orders.length ? 'No matching orders.' : 'No customer orders yet.'}</b><span>{orders.length ? 'Try another search or status filter.' : 'Orders placed through demo checkout will appear here.'}</span></div>}
    <div className="admin-note"><ShieldCheck size={16} /><span>Demo orders are stored in this browser’s LocalStorage. They are not sent to a server and do not trigger remote or real-time notifications.</span></div>
  </section>
}

export function AdminOrderDetailsPage() {
  const { user, orders, updateOrderStatus } = useStore()
  const { orderId } = useParams()
  const navigate = useNavigate()
  const order = orders.find(item => item.id === orderId)
  if (user?.role !== 'admin') return <Navigate to="/admin/login" replace />
  if (!order) return <div className="admin-order-page"><div className="admin-order-missing"><h1>Order not found</h1><p>This order may have been removed from this browser.</p><Link className="button button-dark" to="/admin">BACK TO ADMIN</Link></div></div>

  const updateStatus = event => updateOrderStatus(order.id, event.target.value)
  const printInvoice = () => window.print()

  return <div className="admin-order-page">
    <div className="admin-order-toolbar">
      <Link to="/admin"><ArrowLeft size={15} /> BACK TO ORDERS</Link>
      <div><button className="button button-light-outline" onClick={printInvoice}><Printer size={15} /> PRINT INVOICE</button><button className="button button-orange" onClick={printInvoice}><Download size={15} /> SAVE AS PDF</button></div>
    </div>
    <article className="admin-invoice" aria-label={`Order details and invoice for ${order.id}`}>
      <header className="admin-invoice-header"><div><span className="eyebrow">SNEAKERS WORLD BY RANA · DEMO INVOICE</span><h1>Order {order.id}</h1><p>Placed {formatDate(order.date)}</p></div><div className="admin-invoice-status"><label htmlFor="invoice-order-status">ORDER STATUS</label><select id="invoice-order-status" className="status-select" value={ORDER_STATUSES.includes(order.status) ? order.status : 'Pending'} onChange={updateStatus}>{ORDER_STATUSES.map(status => <option key={status}>{status}</option>)}</select></div></header>
      <div className="admin-invoice-contact-grid"><section><span className="eyebrow">CUSTOMER</span><h2>{order.customer?.name || '—'}</h2><p>{order.customer?.phone || 'No phone provided'}<br />{order.customer?.email || ''}</p></section><section><span className="eyebrow">DELIVERY ADDRESS</span><p>{addressText(order.customer) || 'No address provided'}</p></section><section><span className="eyebrow">PAYMENT METHOD</span><p>{order.payment || '—'}</p></section></div>
      <div className="admin-table-scroll"><table className="admin-invoice-items"><thead><tr><th>PRODUCT</th><th>SIZE</th><th>COLOR</th><th>QTY</th><th>UNIT PRICE</th><th>LINE TOTAL</th></tr></thead><tbody>{order.items?.map((item, index) => <tr key={`${item.key || item.productId}-${index}`}><td><div className="admin-invoice-product">{item.image && <img src={item.image} alt="" />}<b>{item.productName || item.name || item.product?.name || 'Product'}</b></div></td><td>EU {item.size}</td><td>{item.color}</td><td>{item.quantity}</td><td>{money(item.unitPrice ?? item.price ?? 0)}</td><td>{money(item.lineTotal ?? (item.unitPrice ?? item.price ?? 0) * item.quantity)}</td></tr>)}</tbody></table></div>
      <div className="admin-invoice-totals"><div><span>Subtotal</span><b>{money(order.subtotal)}</b></div><div><span>Discount</span><b>−{money(order.discount)}</b></div><div><span>Delivery</span><b>{money(order.delivery)}</b></div><div className="admin-invoice-grand-total"><span>Total</span><strong>{money(order.total)}</strong></div></div>
      <footer className="admin-invoice-footer">Demo invoice only. No payment has been processed and no shipment is arranged.</footer>
    </article>
    <button className="admin-order-back-link" onClick={() => navigate('/admin')}>Return to dashboard</button>
  </div>
}

# SNEAKERS WORLD BY RANA — STEP INTO YOUR WORLD.

A responsive Bangladesh footwear storefront demo built with React, Vite, Tailwind CSS, React Router and Lucide icons. The product catalog, cart, wishlist, demo account, orders and admin edits are stored in the browser's LocalStorage.

## Run locally

Install Node.js 20 or newer, then open a terminal in this folder:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). To create and preview a production build:

```powershell
npm run build
npm run preview
```

## Demo admin login

- Login page: `/admin/login`
- Email: `admin@gmail.com`
- Password: `rana1234`

The standalone admin page provides demo credentials, password visibility, validation errors and LocalStorage-backed login state. The dashboard has Dashboard, Orders, Products, Customers, Inventory, Settings and Categories sections. It lists actual demo checkout orders; search supports order ID/customer details and the status filter covers Pending, Confirmed, Processing, Shipped, Delivered and Cancelled. Open an order for customer/delivery details and use **Print invoice** or **Save as PDF** (the browser print dialog provides PDF saving). Use the admin sidebar's logout control to end the demo session.

## What's included

- 30 fictional demo footwear products, category and brand filters, price sorting, search, product detail and quick view.
- Persistent demo cart, size/color selection, wishlist, customer profile, saved address and order history.
- Demo checkout with Cash on Delivery, bKash, Nagad and card simulation options. **No payment is processed and no order is fulfilled.**
- Checkout orders are saved in LocalStorage with a generated order ID, a snapshot of purchased product details, customer contact, delivery address, price totals and payment choice. The same browser immediately updates the admin dashboard; order data survives refresh and is shared between tabs in that browser.
- Admin dashboard with actual demo order/revenue/pending/delivered counts, customer list, order search/filtering/status changes, order details/invoices, plus product/category/inventory management.
- Responsive layouts, mobile navigation, image fallbacks, newsletter demo and accessible form labels.

## Demo and production boundaries

Authentication and administrator permissions are frontend-only; the demo user's role is stored in LocalStorage and the demo credentials are public by design. The password itself is not saved. Route guards improve the demo experience but **are not secure** and must not be used to protect real customer or store data. Orders in LocalStorage are visible only to this browser profile and are not shared with a remote store or other customers.

### Production database and authentication

This repository has no backend or database to connect to. Before launch:

1. Create a Supabase (or equivalent) project and tables for `products`, `orders`, and `order_items`. Keep an immutable order-item snapshot (name/SKU, size, color, unit price, quantity and line total), customer contact, delivery address, payment state, status, and timestamps. Use a transaction/RPC or trusted server endpoint to validate current prices and stock, create the order and decrement inventory atomically.
2. Replace `src/services/authService.js` with the provider's server-validated sign-in flow. Keep admin roles in a trusted profile/claims table that only a trusted administrator can assign. Never decide admin access from a browser-stored role or expose a service-role/database secret in Vite client variables.
3. Enforce row-level security (RLS) or equivalent rules for every table: customers can read only their own orders, and only authenticated admin claims can list/update all orders, statuses, catalog or inventory. Re-check authorization on every server/API operation; a React route guard is not an authorization boundary.
4. Move order creation and payment confirmation to server code. Integrate a payment provider using server-side secrets and signed webhooks; validate webhook events before changing payment/order state. Configure HTTPS, allowed origins, backups, data retention and monitoring. Add a provider-backed subscription only if remote live updates are desired; this LocalStorage demo does not provide real-time notifications.

Payment options in this project are visual simulations only. No payment is processed, and no order is fulfilled. A production launch also needs payment verification, a real delivery/returns workflow and privacy-appropriate customer data handling. Remote product photography and web fonts require an internet connection.

## Development checklist

### Existing and completed demo features

- [x] Responsive React/Vite storefront, product catalog, category/brand/price filters, product detail, cart, wishlist and demo customer profile.
- [x] Browser-persisted demo checkout orders, order history, admin dashboard, catalog/category/inventory screens, order search/status editing and printable invoices.
- [x] Search across product name, brand, category, colors and descriptions; filter by EU size.
- [x] Product comparison (up to three), recently viewed products, reviews form and EU/UK/US/CM size chart.
- [x] Demo checkout coupon codes `RANA10` and `STEP15`.
- [x] Admin order CSV export and `Returned` order status.

### Still required before a real store launch

- [ ] Add a trusted backend/database, server-side authentication and admin authorization, RLS/access policies and server-validated order/stock operations.
- [ ] Add live bKash, Nagad and SSLCommerz transactions with server-side verification and webhooks; current choices are simulations only.
- [ ] Add Pathao, Steadfast and RedX credentials plus server-side booking/tracking workflows; no courier booking is performed here.
- [ ] Complete production-grade customer management, size/color-level inventory, coupon administration, review moderation, returns/refunds and notification workflows.
- [ ] Add live sales charts and scheduled/exportable sales reports; current analytics are limited to data already in local demo orders.
- [ ] Run end-to-end browser, mobile viewport, accessibility and provider integration tests against the configured backend.

There is no database connection in the current repository. LocalStorage data and frontend demo authentication are intentionally not secure or shared across devices.

## Project structure

```text
src/
  components/       Product cards, shared header, footer, search and toast
  context/          LocalStorage-backed storefront state
  data/             Fictional product and category catalog
  layouts/          Store and focused checkout layouts
  pages/            Store, product, account, checkout, info and admin screens
  services/         Demo authentication boundary for a future auth provider
  App.jsx           Route definitions
  index.css         Tailwind directives and responsive design system
  main.jsx          Vite entry point
index.html
package.json
```

import { Route, Routes } from 'react-router-dom'
import StoreLayout from './layouts/StoreLayout'
import CheckoutLayout from './layouts/CheckoutLayout'
import { HomePage, ProductListingPage, ProductPage, ProductReviewsPage, ProductComparisonPage, SizeGuidePage, CartPage, WishlistPage, NotFoundPage } from './pages/ShopPages'
import { CheckoutPage, OrderSuccessPage } from './pages/CheckoutPages'
import { AboutPage, ContactPage, FAQPage } from './pages/InfoPages'
import { AccountPage, ProfilePage, AdminPage } from './pages/AccountAdminPages'
import { AdminOrderDetailsPage } from './pages/AdminOrders'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminLayout from './layouts/AdminLayout'

export default function App() {
  return <Routes>
    <Route element={<StoreLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ProductListingPage />} />
      <Route path="/sneakers" element={<ProductListingPage />} />
      <Route path="/running-shoes" element={<ProductListingPage />} />
      <Route path="/casual-shoes" element={<ProductListingPage />} />
      <Route path="/sports-shoes" element={<ProductListingPage />} />
      <Route path="/sandals" element={<ProductListingPage />} />
      <Route path="/new-arrivals" element={<ProductListingPage mode="new" />} />
      <Route path="/best-sellers" element={<ProductListingPage mode="best" />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/product/:id/reviews" element={<ProductReviewsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/compare" element={<ProductComparisonPage />} />
      <Route path="/size-guide" element={<SizeGuidePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    <Route element={<AdminLayout />}>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/orders/:orderId" element={<AdminOrderDetailsPage />} />
    </Route>
    <Route element={<CheckoutLayout />}>
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
    </Route>
  </Routes>
}

import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ui/ScrollToTopButton';
import { HomePage } from './pages/Home';
import { CatalogPage } from './pages/Catalog';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { AboutPage } from './pages/About';
import { ContactsPage } from './pages/Contacts';
import { PrivacyPage } from './pages/Privacy';
import { DeliveryPage } from './pages/Delivery';
import { ReturnsPage } from './pages/Returns';
import FaqPage from './pages/FAQ';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />

      <Header />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

export default App
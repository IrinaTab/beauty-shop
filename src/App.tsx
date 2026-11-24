import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollToTopButton } from './components/ui/ScrollToTopButton';

const HomePage = lazy(() => import('./pages/Home').then(m => ({ default: m.HomePage })));
const CatalogPage = lazy(() => import('./pages/Catalog').then(m => ({ default: m.CatalogPage })));
const CartPage = lazy(() => import('./pages/Cart').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/Checkout').then(m => ({ default: m.CheckoutPage })));
const AboutPage = lazy(() => import('./pages/About').then(m => ({ default: m.AboutPage })));
const ContactsPage = lazy(() => import('./pages/Contacts').then(m => ({ default: m.ContactsPage })));
const PrivacyPage = lazy(() => import('./pages/Privacy').then(m => ({ default: m.PrivacyPage })));
const DeliveryPage = lazy(() => import('./pages/Delivery').then(m => ({ default: m.DeliveryPage })));
const ReturnsPage = lazy(() => import('./pages/Returns').then(m => ({ default: m.ReturnsPage })));
const FaqPage = lazy(() => import('./pages/FAQ').then(m => ({ default: m.FaqPage })));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', color: 'var(--text-secondary)' }}>
    Загрузка...
  </div>
);

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />

      <main style={{ flexGrow: 1 }}>
        {/* Оборачиваем Routes в Suspense, чтобы показать лоадер пока страница грузится */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

export default App;
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.css';
import { clsx } from 'clsx';

export const Header = () => {
    const { totalItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { path: '/', label: 'Главная' },
        { path: '/catalog', label: 'Каталог' },
        { path: '/about', label: 'О нас' },
        { path: '/contacts', label: 'Контакты' },
        { path: '/delivery', label: 'Доставка и оплата' },
    ];

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.inner}>
                    {/* Логотип */}
                    <Link to="/" className={styles.logo} onClick={closeMenu}>
                        <Sparkles size={28} color="var(--accent)" />
                        BeautyShop
                    </Link>

                    {/* Навигация для десктопа */}
                    <nav className={styles.desktopNav}>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Корзина и Бургер */}
                    <div className={styles.actions}>
                        <Link to="/cart" className={styles.cartBtn}>
                            <Button variant="ghost">
                                <ShoppingBag size={24} />
                                {totalItems > 0 && (
                                    <span className={styles.badge}>{totalItems}</span>
                                )}
                            </Button>
                        </Link>

                        {/* Кнопка бургера (видна только на мобилках) */}
                        <button
                            className={styles.burgerBtn}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Выпадающее мобильное меню */}
                <div className={clsx(styles.mobileMenu, isMenuOpen && styles.mobileMenuOpen)}>
                    <nav className={styles.mobileNav}>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => clsx(styles.mobileNavLink, isActive && styles.active)}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </Container>
        </header>
    );
};
import { Link } from 'react-router-dom';
import { Sparkles, Leaf, ShieldCheck } from 'lucide-react';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { ProductCard } from '../../components/ProductCard';
import { products } from '../../data/products';
import styles from './Home.module.css';

export const HomePage = () => {
    // Берем первые 4 товара для блока "Популярное"
    const popularProducts = products.slice(0, 4);

    return (
        <div>
            <Container>
                {/* Hero-баннер */}
                <div className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>Откройте для себя силу природы</h1>
                        <p className={styles.subtitle}>
                            Премиальный уход за кожей на основе натуральных ингредиентов и научных разработок.
                        </p>
                        <Link to="/catalog">
                            <Button variant="primary">Перейти в каталог</Button>
                        </Link>
                    </div>
                </div>

                {/* Преимущества */}
                <div className={styles.features}>
                    <h2 className={styles.sectionTitle}>Почему мы?</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <Sparkles size={32} color="var(--accent)" style={{ margin: '0 auto' }} />
                            <h3>Инновационные формулы</h3>
                            <p>Используем передовые компоненты для максимального результата.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <Leaf size={32} color="var(--accent)" style={{ margin: '0 auto' }} />
                            <h3>100% Натурально</h3>
                            <p>В составе только безопасные и этичные ингредиенты.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <ShieldCheck size={32} color="var(--accent)" style={{ margin: '0 auto' }} />
                            <h3>Дерматологически протестировано</h3>
                            <p>Безопасно для всех типов кожи.</p>
                        </div>
                    </div>
                </div>

                {/* Популярные товары */}
                <div className={styles.popular}>
                    <h2 className={styles.sectionTitle}>Популярные товары</h2>
                    <div className={styles.productsGrid}>
                        {popularProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className={styles.viewAllBtnWrapper}>
                        <Link to="/catalog">
                            <Button variant="secondary">Смотреть все</Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};
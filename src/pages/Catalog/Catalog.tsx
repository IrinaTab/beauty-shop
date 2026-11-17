import { ProductCard } from '../../components/ProductCard';
import { Container } from '../../components/ui/Container';
import { products } from '../../data/products';
import styles from './Catalog.module.css';

export const CatalogPage = () => {
    return (
        <div className={styles.page}>
            <Container>
                <h1 className={styles.title}>Каталог товаров</h1>
                <div className={styles.grid}>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Container>
        </div>
    );
};
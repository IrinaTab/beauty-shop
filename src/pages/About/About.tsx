import { Container } from '../../components/Container';
import { Sparkles, Heart, Leaf } from 'lucide-react';
import styles from './About.module.css';

export const AboutPage = () => {
    return (
        <Container>
            <div className={styles.page}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>О нас</h1>
                    <p className={styles.lead}>
                        BeautyShop — это место, где наука встречается с красотой.
                        Мы создаем уходовую косметику с любовью к вашей коже.
                    </p>
                </div>

                <div className={styles.features}>
                    <div className={styles.feature}>
                        <Sparkles size={32} color="var(--accent)" />
                        <h3>Инновации</h3>
                        <p>Используем передовые формулы и активные компоненты.</p>
                    </div>
                    <div className={styles.feature}>
                        <Leaf size={32} color="var(--accent)" />
                        <h3>Натуральность</h3>
                        <p>В составе только безопасные и этичные ингредиенты.</p>
                    </div>
                    <div className={styles.feature}>
                        <Heart size={32} color="var(--accent)" />
                        <h3>Забота</h3>
                        <p>Каждый продукт протестирован дерматологами.</p>
                    </div>
                </div>

                <div className={styles.textBlock}>
                    <h2>Наша миссия</h2>
                    <p>
                        Мы верим, что уход за собой — это не роскошь, а ежедневный ритуал любви к себе.
                        Поэтому мы делаем косметику, которая работает, радует и вдохновляет.
                    </p>
                </div>
            </div>
        </Container>
    );
};
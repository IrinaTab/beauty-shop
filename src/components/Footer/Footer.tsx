import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Container } from '../ui/Container';
import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h3>
                            <Sparkles size={24} color="var(--accent)" />
                            BeautyShop
                        </h3>
                        <p>Мы создаем уходовую косметику с любовью к вашей коже. Красота начинается с заботы о себе.</p>
                    </div>

                    <div className={styles.links}>
                        <h4>Магазин</h4>
                        <ul>
                            <li><Link to="/catalog">Каталог</Link></li>
                            <li><Link to="/about">О нас</Link></li>
                            <li><Link to="/contacts">Контакты</Link></li>
                        </ul>
                    </div>

                    <div className={styles.links}>
                        <h4>Помощь</h4>
                        <ul>
                            <li><Link to="/">Доставка и оплата</Link></li>
                            <li><Link to="/">Возврат</Link></li>
                            <li><Link to="/">Часто задаваемые вопросы</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} BeautyShop. Все права защищены.</p>
                </div>
            </Container>
        </footer>
    );
};
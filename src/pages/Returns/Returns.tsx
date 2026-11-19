import { Container } from '../../components/ui/Container';
import styles from './Returns.module.css';

export const ReturnsPage = () => {
    return (
        <Container>
            <div className={styles.page}>
                <h1 className={styles.title}>Возврат и обмен</h1>

                <div className={styles.content}>
                    <h2>Условия возврата</h2>
                    <p>Вы можете вернуть или обменять товар надлежащего качества в течение 14 дней с момента покупки. Товар должен быть в оригинальной упаковке, без следов использования.</p>

                    <h2>Как оформить возврат?</h2>
                    <p>1. Напишите нам на почту hello@beautyshop.ru или в Telegram.</p>
                    <p>2. Укажите номер заказа и причину возврата.</p>
                    <p>3. Мы согласуем с вами удобный способ передачи товара.</p>

                    <h2>Возврат денежных средств</h2>
                    <p>Деньги возвращаются тем же способом, которым была произведена оплата, в течение 10 рабочих дней после получения товара нами.</p>
                </div>
            </div>
        </Container>
    );
};
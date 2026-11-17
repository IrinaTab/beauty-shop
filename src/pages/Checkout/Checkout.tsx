import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import styles from './Checkout.module.css';

export const CheckoutPage = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', phone: '', comment: '', agreed: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    if (cart.length === 0 && !isSuccess) {
        navigate('/cart');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const orderDetails = cart
            .map(item => `• ${item.name} — ${item.quantity} шт. (${item.price * item.quantity} ₽)`)
            .join('\n');

        const messageText = `
🛍 *Новый заказ!*
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
💬 Комментарий: ${formData.comment || 'Нет'}

📦 *Состав заказа:*
${orderDetails}

💰 *Итого:* ${totalPrice} ₽
    `;

        try {
            const response = await fetch('/api/send-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText }),
            });

            if (!response.ok) throw new Error('Ошибка при отправке');

            setIsSuccess(true);
            clearCart();
        } catch (err) {
            setError('Не удалось отправить заказ. Пожалуйста, попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <Container>
                <div className={styles.successState}>
                    <h1>Заказ успешно оформлен!</h1>
                    <p>Мы свяжемся с вами в ближайшее время для подтверждения.</p>
                    <Link to="/">
                        <Button variant="primary" style={{ marginTop: '24px' }}>На главную</Button>
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className={styles.page}>
                <Link to="/cart" className={styles.backLink}>
                    <ArrowLeft size={16} /> Вернуться в корзину
                </Link>

                <h1 className={styles.title}>Оформление заказа</h1>

                <div className={styles.layout}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {error && <div className={styles.error}>{error}</div>}

                        <div className={styles.field}>
                            <label>Ваше имя *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Иван Иванов"
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Телефон *</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+7 (999) 000-00-00"
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Комментарий к заказу</label>
                            <textarea
                                rows={3}
                                value={formData.comment}
                                onChange={e => setFormData({ ...formData, comment: e.target.value })}
                                placeholder="Пожелания по доставке..."
                            />
                        </div>

                        {/* Блок чекбокса */}
                        <div className={styles.checkboxField}>
                            <input
                                type="checkbox"
                                id="privacy-checkout"
                                required
                                checked={formData.agreed}
                                onChange={e => setFormData({ ...formData, agreed: e.target.checked })}
                            />
                            <label htmlFor="privacy-checkout">
                                Я согласен с <a href="/privacy" target="_blank" rel="noreferrer">политикой конфиденциальности</a>
                            </label>
                        </div>

                        <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
                            {isSubmitting ? 'Отправка...' : 'Подтвердить заказ'}
                        </Button>
                    </form>

                    <div className={styles.summary}>
                        <h2>Ваш заказ</h2>
                        <ul className={styles.summaryList}>
                            {cart.map(item => (
                                <li key={item.id}>
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.summaryTotal}>
                            <span>Итого:</span>
                            <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
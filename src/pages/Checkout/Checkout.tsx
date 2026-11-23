import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, QrCode, CreditCard, Truck, Store, Package, Gift } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { useCart } from '../../context/CartContext';
import styles from './Checkout.module.css';

export const CheckoutPage = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    // Добавили поля isGift и giftType
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        deliveryMethod: 'courier',
        comment: '',
        agreed: false,
        paymentMethod: 'card',
        isGift: false,
        giftType: 'female' // 'female' или 'male'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    // Считаем итоговую сумму с учетом упаковки
    const GIFT_PRICE = 300;
    const finalPrice = formData.isGift ? totalPrice + GIFT_PRICE : totalPrice;

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

        const paymentText = formData.paymentMethod === 'card'
            ? 'Банковской картой онлайн'
            : 'По QR-коду (СБП)';

        let deliveryText = '';
        if (formData.deliveryMethod === 'courier') {
            deliveryText = `Курьером по Москве (Адрес: ${formData.address})`;
        } else if (formData.deliveryMethod === 'cdek') {
            deliveryText = `СДЭК (Пункт выдачи: ${formData.address})`;
        } else {
            deliveryText = 'Самовывоз (г. Москва, ул. Тверская, д. 10)';
        }

        // Добавляем инфу об упаковке в сообщение
        let giftText = '';
        if (formData.isGift) {
            giftText = `\n🎁 Подарочная упаковка: Да (${formData.giftType === 'female' ? 'Женская' : 'Мужская'}) +${GIFT_PRICE} ₽`;
        }

        const messageText = `
🛍 *Новый заказ!*
👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
🚚 Доставка: ${deliveryText}
💳 Оплата: ${paymentText}${giftText}
💬 Комментарий: ${formData.comment || 'Нет'}

📦 *Состав заказа:*
${orderDetails}

💰 *Итого:* ${finalPrice} ₽
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

                        {/* Блок выбора способа доставки */}
                        <div className={styles.field}>
                            <label>Способ получения</label>
                            <div className={styles.paymentMethods}>
                                <label className={`${styles.paymentOption} ${formData.deliveryMethod === 'courier' ? styles.paymentOptionActive : ''}`}>
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="courier"
                                        checked={formData.deliveryMethod === 'courier'}
                                        onChange={() => setFormData({ ...formData, deliveryMethod: 'courier', address: '' })}
                                    />
                                    <Truck size={20} />
                                    <span>Курьер</span>
                                </label>

                                <label className={`${styles.paymentOption} ${formData.deliveryMethod === 'cdek' ? styles.paymentOptionActive : ''}`}>
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="cdek"
                                        checked={formData.deliveryMethod === 'cdek'}
                                        onChange={() => setFormData({ ...formData, deliveryMethod: 'cdek', address: '' })}
                                    />
                                    <Package size={20} />
                                    <span>СДЭК</span>
                                </label>

                                <label className={`${styles.paymentOption} ${formData.deliveryMethod === 'pickup' ? styles.paymentOptionActive : ''}`}>
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="pickup"
                                        checked={formData.deliveryMethod === 'pickup'}
                                        onChange={() => setFormData({ ...formData, deliveryMethod: 'pickup', address: '' })}
                                    />
                                    <Store size={20} />
                                    <span>Самовывоз</span>
                                </label>
                            </div>
                        </div>

                        {/* Поле адреса/пункта выдачи */}
                        {(formData.deliveryMethod === 'courier' || formData.deliveryMethod === 'cdek') && (
                            <div className={styles.field}>
                                <label>
                                    {formData.deliveryMethod === 'cdek' ? 'Адрес или код пункта выдачи СДЭК *' : 'Адрес доставки *'}
                                </label>
                                <input
                                    type="text"
                                    required={formData.deliveryMethod === 'courier' || formData.deliveryMethod === 'cdek'}
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    placeholder={
                                        formData.deliveryMethod === 'cdek'
                                            ? 'Например: г. Москва, ул. Тверская, 10 (или код ПВЗ)'
                                            : 'Город, улица, дом, квартира'
                                    }
                                />
                            </div>
                        )}

                        {/* Информация о самовывозе */}
                        {formData.deliveryMethod === 'pickup' && (
                            <div className={styles.pickupInfo}>
                                <Store size={24} color="var(--accent)" />
                                <div>
                                    <strong>Пункт самовывоза:</strong>
                                    <p>г. Москва, ул. Тверская, д. 10</p>
                                </div>
                            </div>
                        )}

                        <div className={styles.field}>
                            <label>Комментарий к заказу</label>
                            <textarea
                                rows={3}
                                value={formData.comment}
                                onChange={e => setFormData({ ...formData, comment: e.target.value })}
                                placeholder="Пожелания по доставке..."
                            />
                        </div>

                        {/* Блок подарочной упаковки */}
                        <div className={styles.giftBlock}>
                            <Checkbox
                                id="gift-checkbox"
                                checked={formData.isGift}
                                onChange={(checked) => setFormData({ ...formData, isGift: checked })}
                            >
                                <span className={styles.giftLabel}>
                                    <Gift size={18} /> Добавить подарочную упаковку (+300 ₽)
                                </span>
                            </Checkbox>

                            {formData.isGift && (
                                <div className={styles.giftOptions}>
                                    <label className={`${styles.paymentOption} ${formData.giftType === 'female' ? styles.paymentOptionActive : ''}`}>
                                        <input
                                            type="radio"
                                            name="giftType"
                                            value="female"
                                            checked={formData.giftType === 'female'}
                                            onChange={() => setFormData({ ...formData, giftType: 'female' })}
                                        />
                                        <span>Для женщины</span>
                                    </label>
                                    <label className={`${styles.paymentOption} ${formData.giftType === 'male' ? styles.paymentOptionActive : ''}`}>
                                        <input
                                            type="radio"
                                            name="giftType"
                                            value="male"
                                            checked={formData.giftType === 'male'}
                                            onChange={() => setFormData({ ...formData, giftType: 'male' })}
                                        />
                                        <span>Для мужчины</span>
                                    </label>
                                </div>
                            )}
                        </div>

                        {/* Блок выбора оплаты */}
                        <div className={styles.field}>
                            <label>Способ оплаты</label>
                            <div className={styles.paymentMethods}>
                                <label className={`${styles.paymentOption} ${formData.paymentMethod === 'card' ? styles.paymentOptionActive : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={formData.paymentMethod === 'card'}
                                        onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                                    />
                                    <CreditCard size={20} />
                                    <span>Картой онлайн</span>
                                </label>

                                <label className={`${styles.paymentOption} ${formData.paymentMethod === 'qr' ? styles.paymentOptionActive : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="qr"
                                        checked={formData.paymentMethod === 'qr'}
                                        onChange={() => setFormData({ ...formData, paymentMethod: 'qr' })}
                                    />
                                    <QrCode size={20} />
                                    <span>По QR-коду (СБП)</span>
                                </label>
                            </div>
                        </div>

                        {/* Блок с QR-кодом */}
                        {formData.paymentMethod === 'qr' && (
                            <div className={styles.qrBlock}>
                                <p className={styles.qrTitle}>Оплата через СБП</p>
                                <div className={styles.qrImageWrapper}>
                                    <img
                                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BeautyShop_Payment"
                                        alt="QR-код для оплаты"
                                        className={styles.qrImage}
                                    />
                                </div>
                                <p className={styles.qrText}>
                                    Отсканируйте код в приложении вашего банка.
                                    После оплаты нажмите «Подтвердить заказ».
                                </p>
                            </div>
                        )}

                        <Checkbox
                            id="privacy-checkout"
                            required
                            checked={formData.agreed}
                            onChange={(checked) => setFormData({ ...formData, agreed: checked })}
                        >
                            Я согласен с <a href="/privacy" target="_blank" rel="noreferrer">политикой конфиденциальности</a>
                        </Checkbox>

                        <Button type="submit" variant="primary" className={styles.submitBtn} disabled={isSubmitting}>
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
                            {/* Показываем упаковку в чеке, если выбрана */}
                            {formData.isGift && (
                                <li className={styles.giftSummaryItem}>
                                    <span>Подарочная упаковка</span>
                                    <span>300 ₽</span>
                                </li>
                            )}
                        </ul>
                        <div className={styles.summaryTotal}>
                            <span>Итого:</span>
                            <span>{finalPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

export const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <Container>
                <div className={styles.emptyState}>
                    <ShoppingBag size={64} color="var(--border-color)" style={{ marginBottom: '16px' }} />
                    <h1>Ваша корзина пуста</h1>
                    <p>Самое время это исправить!</p>
                    <Link to="/catalog">
                        <Button variant="primary" style={{ marginTop: '24px' }}>
                            Перейти в каталог
                        </Button>
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className={styles.page}>
                <div className={styles.headerRow}>
                    <h1 className={styles.title}>Корзина</h1>
                    <Button variant="ghost" onClick={clearCart}>
                        <Trash2 size={16} style={{ marginRight: '6px' }} />
                        Очистить всё
                    </Button>
                </div>

                <div className={styles.layout}>
                    {/* Список товаров */}
                    <div className={styles.itemsList}>
                        {cart.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <img src={item.image} alt={item.name} className={styles.image} />

                                <div className={styles.info}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                    <div className={styles.itemPrice}>{item.price.toLocaleString('ru-RU')} ₽</div>
                                </div>

                                <div className={styles.controls}>
                                    {/* Управление количеством с полем ввода */}
                                    <div className={styles.quantity}>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <input
                                            type="number"
                                            className={styles.qtyInput}
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value, 10);
                                                if (!isNaN(val) && val > 0) updateQuantity(item.id, val);
                                            }}
                                            min="1"
                                        />

                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => removeFromCart(item.id)}
                                        title="Удалить товар"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Блок оформления */}
                    <div className={styles.summary}>
                        <h2 className={styles.summaryTitle}>Итого</h2>
                        <div className={styles.totalRow}>
                            <span>Сумма:</span>
                            <span className={styles.totalPrice}>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>

                        <Link to="/checkout" style={{ display: 'block', marginTop: '20px' }}>
                            <Button variant="primary" fullWidth>
                                Оформить заказ
                            </Button>
                        </Link>

                        <Link to="/catalog" className={styles.backLink}>
                            <ArrowLeft size={16} /> Продолжить покупки
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};
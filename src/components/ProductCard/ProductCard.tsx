import { useState } from 'react';
import type { Product } from '../../types';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { ShoppingBag, MessageCircle, Plus, Minus, CheckCircle2 } from 'lucide-react';
import styles from './ProductCard.module.css';
import { useCart } from '../../context/CartContext';
import { QuestionModal } from '../QuestionModal';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCartWithQuantity } = useCart();

    // Состояния для модалки добавления
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

    // Состояние для модалки "Успешно добавлено"
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleOpenAddModal = () => {
        setQuantity(1); // Сбрасываем количество при открытии
        setIsAddModalOpen(true);
    };

    const handleConfirmAdd = () => {
        addToCartWithQuantity(product, quantity);
        setIsAddModalOpen(false);
        setIsSuccessModalOpen(true); // Показываем окно успеха
    };

    return (
        <>
            <div className={styles.card}>
                <div className={styles.imageWrapper}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.image}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/no-image.jpg';
                        }}
                    />
                </div>

                <div className={styles.content}>
                    <h3 className={styles.title}>{product.name}</h3>
                    <div className={styles.price}>{product.price.toLocaleString('ru-RU')} ₽</div>

                    <div className={styles.actions}>
                        <Button
                            variant="primary"
                            className={styles.addToCartBtn}
                            onClick={handleOpenAddModal}
                            title="Добавить в корзину"
                        >
                            <ShoppingBag size={18} />
                            <span className={styles.btnText}>В корзину</span>
                        </Button>

                        <Button
                            variant="secondary"
                            className={styles.askBtn}
                            title="Задать вопрос по товару"
                            onClick={() => setIsQuestionModalOpen(true)}
                        >
                            <MessageCircle size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Модальное окно выбора количества */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>{product.name}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    Выберите количество:
                </p>

                <div className={styles.modalControls}>
                    <button
                        className={styles.qtyBtn}
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                    >
                        <Minus size={18} />
                    </button>

                    <input
                        type="number"
                        className={styles.qtyInput}
                        value={quantity}
                        onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setQuantity(isNaN(val) || val < 1 ? 1 : val);
                        }}
                        min="1"
                    />

                    <button
                        className={styles.qtyBtn}
                        onClick={() => setQuantity(q => q + 1)}
                    >
                        <Plus size={18} />
                    </button>
                </div>

                <Button variant="primary" fullWidth onClick={handleConfirmAdd} style={{ marginTop: '24px' }}>
                    Добавить в корзину
                </Button>
            </Modal>

            {/* Модальное окно успеха */}
            <Modal
                isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} autoCloseTime={1500}>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <CheckCircle2 size={48} color="var(--accent)" style={{ margin: '0 auto 16px' }} />
                    <h2 style={{ marginBottom: '8px' }}>Добавлено!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                        Товар успешно добавлен в корзину.
                    </p>
                </div>
            </Modal>
            <QuestionModal
                isOpen={isQuestionModalOpen}
                onClose={() => setIsQuestionModalOpen(false)}
                product={product}
            />
        </>
    );
};
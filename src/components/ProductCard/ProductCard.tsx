import { useState } from 'react';
import type { Product } from '../../types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { ShoppingBag, MessageCircle, Plus, Minus, CheckCircle2, Info } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { QuestionModal } from '../QuestionModal';
import { propertyOptions, tagOptions } from '../../data/dictionaries';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCartWithQuantity } = useCart();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const handleOpenAddModal = () => {
        setQuantity(1);
        setIsAddModalOpen(true);
    };

    const handleConfirmAdd = () => {
        addToCartWithQuantity(product, quantity);
        setIsAddModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    // Функция для получения названия свойства (например, 'dry' -> 'Сухая')
    const getPropertyName = (id: string) => propertyOptions.find(opt => opt.id === id)?.name || id;
    // Функция для получения названия тега (например, 'moisture' -> 'Увлажнение')
    const getTagName = (id: string) => tagOptions.find(opt => opt.id === id)?.name || id;

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
                    <div className={styles.titleWrapper}>
                        <h3 className={styles.title}>{product.name}</h3>
                        {/* Кнопка вызова описания */}
                        <button
                            className={styles.infoBtn}
                            onClick={() => setIsInfoModalOpen(true)}
                            title="Подробнее о товаре"
                        >
                            <Info size={18} />
                        </button>
                    </div>

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

            {/* Модалка с описанием товара */}
            <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)}>
                <div className={styles.infoModalContent}>
                    <h2 className={styles.infoTitle}>{product.name}</h2>
                    <img src={product.image} alt={product.name} className={styles.infoImage} />
                    <p className={styles.infoDescription}>{product.description}</p>

                    <div className={styles.infoTags}>
                        <strong>Тип:</strong>
                        {product.propertyIds.map(id => (
                            <span key={id} className={styles.tag}>{getPropertyName(id)}</span>
                        ))}
                    </div>

                    {product.tagIds && product.tagIds.length > 0 && (
                        <div className={styles.infoTags}>
                            <strong>Эффект:</strong>
                            {product.tagIds.map(id => (
                                <span key={id} className={styles.tag}>{getTagName(id)}</span>
                            ))}
                        </div>
                    )}

                    <Button variant="primary" fullWidth onClick={() => {
                        setIsInfoModalOpen(false);
                        handleOpenAddModal();
                    }} style={{ marginTop: '20px' }}>
                        Добавить в корзину
                    </Button>
                </div>
            </Modal>

            {/* Модальное окно выбора количества */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <h2 style={{ marginBottom: '16px', fontSize: '20px' }}>{product.name}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Выберите количество:</p>
                <div className={styles.modalControls}>
                    <button className={styles.qtyBtn} onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>
                        <Minus size={18} />
                    </button>
                    <input type="number" className={styles.qtyInput} value={quantity} onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setQuantity(isNaN(val) || val < 1 ? 1 : val);
                    }} min="1" />
                    <button className={styles.qtyBtn} onClick={() => setQuantity(q => q + 1)}>
                        <Plus size={18} />
                    </button>
                </div>
                <Button variant="primary" fullWidth onClick={handleConfirmAdd} style={{ marginTop: '24px' }}>
                    Добавить в корзину
                </Button>
            </Modal>

            {/* Модальное окно успеха */}
            <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} autoCloseTime={1500}>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <CheckCircle2 size={48} color="var(--accent)" style={{ margin: '0 auto 16px' }} />
                    <h2 style={{ marginBottom: '8px' }}>Добавлено!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Товар успешно добавлен в корзину.</p>
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
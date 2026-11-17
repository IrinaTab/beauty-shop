import { useState } from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import type { Product } from '../../types';
import styles from './QuestionModal.module.css';

interface QuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({ isOpen, onClose, product }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [question, setQuestion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Формируем текст для Telegram
        const message = `
❓ *Вопрос по товару*
📦 Товар: ${product.name} (ID: ${product.id})
👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Вопрос: ${question}
    `;

        try {
            // Отправляем на нашу Serverless-функцию (которую создадим чуть позже)
            const res = await fetch('/api/send-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            if (!res.ok) throw new Error('Ошибка');

            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
                // Очищаем форму
                setName(''); setPhone(''); setQuestion('');
            }, 2500);

        } catch (err) {
            alert('Не удалось отправить вопрос. Попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {isSuccess ? (
                <div className={styles.success}>
                    <h2>Вопрос отправлен!</h2>
                    <p>Мы свяжемся с вами в ближайшее время.</p>
                </div>
            ) : (
                <div className={styles.content}>
                    <h2 className={styles.title}>Задать вопрос</h2>
                    <p className={styles.subtitle}>По товару: <strong>{product.name}</strong></p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.input}
                        />
                        <input
                            type="tel"
                            placeholder="Телефон или Email"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={styles.input}
                        />
                        <textarea
                            placeholder="Ваш вопрос..."
                            required
                            rows={4}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className={styles.textarea}
                        />
                        <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
                            {isSubmitting ? 'Отправка...' : 'Отправить вопрос'}
                        </Button>
                    </form>
                </div>
            )}
        </Modal>
    );
};
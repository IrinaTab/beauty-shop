import { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import styles from './Contacts.module.css';

export const ContactsPage = () => {
    const [formData, setFormData] = useState({ name: '', contact: '', message: '', comment: '', agreed: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const text = `
📩 *Новое сообщение с сайта*
👤 Имя: ${formData.name}
📞 Контакт: ${formData.contact}
💬 Сообщение: ${formData.message}
    `;

        try {
            // Отправляем на тот же эндпоинт, что и заказы
            const res = await fetch('/api/send-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            });

            if (!res.ok) throw new Error('Ошибка');

            setIsSuccess(true);
            setFormData({ name: '', contact: '', message: '', comment: '', agreed: false });

            // Скрываем сообщение об успехе через 4 секунды
            setTimeout(() => setIsSuccess(false), 4000);
        } catch (err) {
            alert('Не удалось отправить сообщение. Попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container>
            <div className={styles.page}>
                <h1 className={styles.title}>Контакты</h1>
                <p className={styles.subtitle}>Мы всегда рады ответить на ваши вопросы!</p>

                <div className={styles.grid}>
                    {/* Контактная информация */}
                    <div className={styles.infoBlock}>
                        <h2>Наши контакты</h2>
                        <div className={styles.infoItem}>
                            <MapPin size={20} color="var(--accent)" />
                            <span>г. Москва, ул. Тверская, д. 10</span>
                        </div>
                        <div className={styles.infoItem}>
                            <Phone size={20} color="var(--accent)" />
                            <span>+7 (999) 123-45-67</span>
                        </div>
                        <div className={styles.infoItem}>
                            <Mail size={20} color="var(--accent)" />
                            <span>hello@beautyshop.ru</span>
                        </div>
                    </div>

                    {/* Форма обратной связи */}
                    <div className={styles.formBlock}>
                        <h2>Напишите нам</h2>

                        {isSuccess ? (
                            <div className={styles.successMessage}>
                                ✅ Сообщение отправлено! Мы свяжемся с вами скоро.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <input
                                    type="text"
                                    placeholder="Ваше имя"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className={styles.input}
                                />
                                <input
                                    type="text"
                                    placeholder="Телефон или Email"
                                    required
                                    value={formData.contact}
                                    onChange={e => setFormData({ ...formData, contact: e.target.value })}
                                    className={styles.input}
                                />
                                <textarea
                                    placeholder="Ваше сообщение..."
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    className={styles.textarea}
                                />
                                {/* Новый универсальный чекбокс */}
                                <Checkbox
                                    id="privacy-q"
                                    required
                                    checked={formData.agreed}
                                    onChange={(checked) => setFormData({ ...formData, agreed: checked })}
                                >
                                    Я согласен с <a href="/privacy" target="_blank" rel="noreferrer">политикой конфиденциальности</a>
                                </Checkbox>

                                <Button type="submit" variant="primary" className={styles.submitBtn} disabled={isSubmitting}>
                                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};
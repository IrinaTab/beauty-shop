import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './ScrollToTopButton.module.css';
import { clsx } from 'clsx';

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Отслеживаем скролл страницы
    useEffect(() => {
        const toggleVisibility = () => {
            // Если прокрутили больше 300px, показываем кнопку
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        // Очищаем слушатель при размонтировании
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Плавный скролл
        });
    };

    return (
        <button
            className={clsx(styles.button, isVisible && styles.visible)}
            onClick={scrollToTop}
            aria-label="Наверх"
            title="Наверх"
        >
            <ArrowUp size={24} />
        </button>
    );
};
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';
import { clsx } from 'clsx';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    autoCloseTime?: number; // Новый пропс: время автозакрытия в мс
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    autoCloseTime
}) => {
    // Состояние для анимации закрытия
    const [isClosing, setIsClosing] = useState(false);

    // Функция плавного закрытия
    const handleClose = () => {
        setIsClosing(true);
        // Ждем окончания анимации (200мс, как в CSS) и только потом вызываем onClose
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 200);
    };

    // Таймер для автозакрытия
    useEffect(() => {
        if (isOpen && autoCloseTime) {
            const timer = setTimeout(() => {
                handleClose();
            }, autoCloseTime);
            return () => clearTimeout(timer);
        }
    }, [isOpen, autoCloseTime]);

    // Блокировка скролла
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className={clsx(styles.overlay, isClosing && styles.closingOverlay)}
            onClick={handleClose}
        >
            <div
                className={clsx(styles.modal, isClosing && styles.closingModal)}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeBtn} onClick={handleClose}>
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};
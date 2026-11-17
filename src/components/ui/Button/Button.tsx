import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
import { clsx } from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className,
    ...props
}) => {
    return (
        <button
            className={clsx(styles.button, styles[variant], fullWidth && styles.fullWidth, className)}
            {...props}
        >
            {children}
        </button>
    );
};
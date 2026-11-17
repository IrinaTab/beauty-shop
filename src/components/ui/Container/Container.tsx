import React from 'react';
import type { HTMLAttributes } from 'react';
import styles from './Container.module.css';
import { clsx } from 'clsx';

export const Container: React.FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div className={clsx(styles.container, className)} {...props}>
            {children}
        </div>
    );
};
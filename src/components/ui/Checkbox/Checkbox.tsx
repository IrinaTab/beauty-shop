import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    required?: boolean;
    children: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    id, checked, onChange, required = false, children
}) => {
    return (
        <div className={styles.wrapper}>
            <input
                type="checkbox"
                id={id}
                className={styles.input}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                required={required}
            />
            <label htmlFor={id} className={styles.label}>
                {children}
            </label>
        </div>
    );
};
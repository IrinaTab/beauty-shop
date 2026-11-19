import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';
import { clsx } from 'clsx';

interface AccordionItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className={styles.item}>
            <button className={styles.header} onClick={onClick}>
                <span className={styles.question}>{question}</span>
                <ChevronDown
                    size={20}
                    className={clsx(styles.icon, isOpen && styles.iconOpen)}
                />
            </button>
            <div className={clsx(styles.content, isOpen && styles.contentOpen)}>
                <div className={styles.answer}>
                    {answer}
                </div>
            </div>
        </div>
    );
};

interface AccordionProps {
    items: { question: string; answer: string }[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.accordion}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                />
            ))}
        </div>
    );
};
import type { Category, FilterOption } from '../types';

export const categories: Category[] = [
    { id: 'care', name: 'Уход за лицом' },
    { id: 'cleansing', name: 'Очищение' },
    { id: 'serums', name: 'Сыворотки' },
    { id: 'masks', name: 'Маски' },
    { id: 'makeup', name: 'Макияж' },
    { id: 'protection', name: 'Защита' },
];

// Универсальные свойства (в косметике это тип кожи)
export const propertyOptions: FilterOption[] = [
    { id: 'all', name: 'Все типы' },
    { id: 'dry', name: 'Сухая' },
    { id: 'normal', name: 'Нормальная' },
    { id: 'oily', name: 'Жирная' },
    { id: 'combo', name: 'Комбинированная' },
];

// Универсальные теги (в косметике это проблемы/эффект)
export const tagOptions: FilterOption[] = [
    { id: 'moisture', name: 'Увлажнение' },
    { id: 'acne', name: 'Акне' },
    { id: 'anti-age', name: 'Anti-age' },
    { id: 'pigmentation', name: 'Пигментация' },
    { id: 'nutrition', name: 'Питание' },
    { id: 'protection', name: 'Защита' },
];
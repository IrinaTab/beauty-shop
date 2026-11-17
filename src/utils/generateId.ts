import type { Product } from '../types';

/**
 * Создает генератор ID на основе существующих товаров.
 * Находит максимальный ID, и при каждом вызове выдает следующий.
 */
export const createIdGenerator = (existingProducts: Partial<Product>[]) => {
    // Ищем максимальный существующий ID (например, из 'prod_5' получаем 5)
    const maxId = existingProducts.reduce((max, product) => {
        if (!product.id) return max;
        const numericId = parseInt(product.id.replace('prod_', ''), 10);
        return !isNaN(numericId) && numericId > max ? numericId : max;
    }, 0);

    let currentId = maxId;

    // Возвращаем функцию, которая при вызове увеличивает счетчик и выдает ID
    return (): string => {
        currentId += 1;
        return `prod_${currentId}`;
    };
};
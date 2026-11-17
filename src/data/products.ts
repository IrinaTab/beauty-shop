import type { Product } from '../types';
import { createIdGenerator } from '../utils/generateId';

// Описываем товары без id и image. 
// Omit<Product, 'id' | 'image'> означает "все поля Product, кроме id и image"
// При создании нового продукта propertyIds: и tagIds: выбрать в массиве данных dsrc/data

const rawProducts: Omit<Product, 'id' | 'image'>[] = [
    {
        name: 'Увлажняющий крем с гиалуроновой кислотой',
        price: 2500,
        categoryId: 'care',
        description: 'Легкий крем для глубокого увлажнения и восстановления защитного барьера кожи.',
        propertyIds: ['dry', 'normal'],
        tagIds: ['moisture'],
    },
    {
        name: 'Очищающий гель для умывания',
        price: 1800,
        categoryId: 'cleansing',
        description: 'Мягкое очищение, не пересушивает кожу, подходит для ежедневного применения.',
        propertyIds: ['oily', 'combo'],
        tagIds: ['acne'],
    },
    {
        name: 'Сыворотка с витамином С',
        price: 3200,
        categoryId: 'serums',
        description: 'Осветляет пигментацию, выравнивает тон кожи и придает сияние.',
        propertyIds: ['normal', 'combo'],
        tagIds: ['pigmentation', 'anti-age'],
    },
    {
        name: 'Питательная маска для лица',
        price: 2100,
        categoryId: 'masks',
        description: 'Интенсивное питание и восстановление кожи после стресса или холода.',
        propertyIds: ['dry'],
        tagIds: ['nutrition'],
    },
    {
        name: 'Матовая помада',
        price: 1500,
        categoryId: 'makeup',
        description: 'Стойкая матовая помада с ухаживающими маслами в составе.',
        propertyIds: ['all'],
        tagIds: [],
    },
    {
        name: 'Солнцезащитный крем SPF 50',
        price: 2800,
        categoryId: 'protection',
        description: 'Надежная защита от UVA и UVB лучей, не оставляет белых следов.',
        propertyIds: ['all'],
        tagIds: ['protection', 'anti-age'],
    },
];

// 1. Создаем генератор ID (сначала он пустой, maxId = 0)
const getNextId = createIdGenerator(rawProducts);

// 2. Собираем итоговый массив
export const products: Product[] = rawProducts.map((raw) => {
    // 3. Получаем фиксированный ID (при первом запуске это prod_1, prod_2 и т.д.)
    const fixedId = getNextId();

    // 4. Выводим подсказку для разработчика
    console.log(
        `%c[Товар] "${raw.name}"%c\nID: ${fixedId}\nКартинка: public/products/${fixedId}.jpg`,
        'color: #d4a5a5; font-weight: bold;',
        'color: inherit;'
    );

    return {
        ...raw,
        id: fixedId, // Записываем в товар
        image: `/products/${fixedId}.jpg`, // Формируем путь
    };
});
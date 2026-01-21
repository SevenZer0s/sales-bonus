/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
   // @TODO: Расчет выручки от операции
//    const { discount, sale_price, quantity } = purchase;
    const discount = 1 - (purchase.discount / 100)
    const sale_price = purchase.sale_price
    const quantity = purchase.quantity
   return discount * sale_price * quantity
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
    // @TODO: Расчет бонуса от позиции в рейтинге
    const { profit } = seller;
    // const profit = seller.profit
    if (index === 0) {
        return profit * (15/100)
    } else if (index === 1 || index === 2) {
        return profit * (10/100)
    } else if (index === total - 1) { // худший продавец (последнее место)
        return 0
    } else {
        return profit * (5/100) // все остальные
    }

}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
    // @TODO: Проверка входных данных

    if (
        !data
        || !Array.isArray(data.sellers)
        || !Array.isArray(data.products)
        || !Array.isArray(data.purchase_records)
        || data.sellers.length === 0
        || data.products.length === 0
        || data.purchase_records.length === 0
    ) {
        throw new Error('Некорректные входные данные');
    }
    // @TODO: Проверка наличия опций

    if (typeof options === null || typeof options !== 'object') {
        throw new Error('Опции должны быть - Обьектом');
    }

    const { calculateRevenue, calculateBonus } = options; // функция для расчетов

    if (typeof calculateRevenue !== "function" || typeof calculateBonus !== "function") {
        throw new Error('Не является функцией - передайте функцию');
    }

    // @TODO: Подготовка промежуточных данных для сбора статистики

    const sellerStats = data.sellers.map(seller => ({
        id: seller.id,
        name: `${seller.first_name} ${seller.last_name}`,
        revenue: 0,
        profit: 0,
        sales_count: 0,
        products_sold: {}
    }));

    // @TODO: Индексация продавцов и товаров для быстрого доступа

    // Индексация продавцов

    const sellerIndex = Object.fromEntries(sellerStats.map(sellers => [sellers.id, sellers]));
    // console.log(sellerIndex)
    // Индексация товаров

    const productIndex = Object.fromEntries(data.products.map(products => [products.sku, products]));
    // console.log(productIndex)

    // @TODO: Расчет выручки и прибыли для каждого продавца

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями
}

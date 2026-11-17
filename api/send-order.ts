import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Разрешаем только POST запросы
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // --- ЗАГЛУШКА ДЛЯ УЧЕБНОГО ПРОЕКТА ---
    // В реальном проекте здесь был бы код отправки в Telegram:
    // const token = process.env.TELEGRAM_BOT_TOKEN;
    // const chatId = process.env.TELEGRAM_CHAT_ID;
    // await fetch(...)

    // Выводим сообщение в консоль сервера, чтобы вы видели, что оно "дошло"
    console.log('\n=========================================');
    console.log('📦 НОВОЕ УВЕДОМЛЕНИЕ С САЙТА (ЗАГЛУШКА)');
    console.log('=========================================');
    console.log(message);
    console.log('=========================================\n');

    // Имитируем задержку сети (чтобы кнопка "Отправка..." была видна)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Возвращаем успех, чтобы фронтенд показал зеленое окно "Отправлено"
    return res.status(200).json({
        success: true,
        info: 'Message logged to console (Mock mode)'
    });
}
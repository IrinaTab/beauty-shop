import { Truck, CreditCard, ShieldCheck, PackageCheck } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import styles from './Delivery.module.css';

export const DeliveryPage = () => {
    return (
        <Container>
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Доставка и оплата</h1>
                    <p className={styles.subtitle}>
                        Мы делаем всё, чтобы ваш заказ пришел быстро, а процесс покупки был удобным и безопасным.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Блок Доставки */}
                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>
                            <Truck size={32} color="var(--accent)" />
                        </div>
                        <h2>Способы доставки</h2>

                        <div className={styles.infoItem}>
                            <PackageCheck size={20} color="var(--accent)" />
                            <div>
                                <strong>Курьером по Москве</strong>
                                <p>Доставка в день заказа или на следующий день. Стоимость — 300 ₽. При заказе от 5000 ₽ — бесплатно.</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <PackageCheck size={20} color="var(--accent)" />
                            <div>
                                <strong>Почтой России / СДЭК</strong>
                                <p>Доставка по всей России занимает от 2 до 7 дней. Стоимость рассчитывается индивидуально при оформлении.</p>
                            </div>
                        </div>
                    </div>

                    {/* Блок Оплаты */}
                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>
                            <CreditCard size={32} color="var(--accent)" />
                        </div>
                        <h2>Способы оплаты</h2>

                        <div className={styles.infoItem}>
                            <ShieldCheck size={20} color="var(--accent)" />
                            <div>
                                <strong>Банковской картой онлайн</strong>
                                <p>Безопасная оплата картами Visa, MasterCard, МИР прямо на сайте через защищенный шлюз.</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <ShieldCheck size={20} color="var(--accent)" />
                            <div>
                                <strong>При получении (наложенный платеж)</strong>
                                <p>Вы можете оплатить заказ наличными или картой курьеру при получении.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Блок с гарантией */}
                <div className={styles.guarantee}>
                    <h2>Гарантия качества</h2>
                    <p>
                        Мы тщательно проверяем каждую баночку перед отправкой. Если вы обнаружили дефект упаковки или продукт не подошел,
                        вы можете вернуть его в течение 14 дней с момента получения (при сохранении товарного вида).
                    </p>
                </div>
            </div>
        </Container>
    );
};
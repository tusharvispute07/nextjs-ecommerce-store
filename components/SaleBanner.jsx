import styles from '@/styles/SaleBanner.module.css'
import Center from './Center'

export default function SaleBanner(){

    return (
        <div className={styles.container}>
            <div className={styles.card_1}>
                <img src="/images/new-style-banner.jpg" alt="" />
                <p>#NEWSTYLE</p>
            </div>
            <div className={styles.card_2}>
                <h1>GET 30% OFF</h1>
            </div>

            <div className={styles.card_3}>
                <img src="/images/winter-banner.jpg" alt="" />
                <p>#WINTERLOOK</p>
            </div>
        </div>

    )
}
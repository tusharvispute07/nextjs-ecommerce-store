import styles from '@/styles/SaleBanner.module.css'


export default function SaleBanner({settingsData}){

    return (
        <div className={styles.container}>
            <div className={styles.card_1}>
                <img src={settingsData.salesBannerLeft} alt="" />
                <p>#NEWSTYLE</p>
            </div>
            <div className={styles.card_2}>
                <h1>GET 30% OFF</h1>
            </div>

            <div className={styles.card_3}>
                <img src={settingsData.salesBannerRight} alt="" />
                <p>#WINTERLOOK</p>
            </div>
        </div>

    )
}
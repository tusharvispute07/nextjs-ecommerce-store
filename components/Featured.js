
import styles from '@/styles/Featured.module.css'
import Link from "next/link";

export default function Featured({settingsData}){
    console.log("This is the headerbanner",settingsData.headerBanner)
    return(
            <div className={styles.featured_product}>
                <img src={settingsData.headerBanner} alt="" />
                <div className={styles.content}>
                    <p className={styles.heading}>Curated Styles,<br/>Unmached Elegence</p> 
                    <p className={styles.sub_heading}>Express Yourself with Confidence and Style. Get the best quality clothes at minimum price. </p> 
                    <Link href={'/categories'}>Shop Now</Link>
                </div>
            </div>
            
    )
}
import styles from "@/styles/PhoneNav.module.css"
import Link from "next/link"

export default function PhoneNav(){

    return (
        <div className={styles.wrapper_container}>
            <div className={styles.nav_container}>
            <Link href={'/bag'}>
                <i id={styles.bag} class="bi bi-bag-fill"></i>
            </Link>
            <Link href={'/wishlist'}>
                <i id={styles.wishlist} class="bi bi-heart-fill"></i>
            </Link>
            <Link href={'/user'}>
                <i id={styles.user} class="bi bi-person-fill"></i>
            </Link>
            </div>
        </div>
        
    )
}
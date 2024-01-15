import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import styles from '@/styles/User.module.css'
import Link from "next/link"

export default function UserNav(){

    const {data:session} = useSession()

    const router = useRouter()

    return (
            <div className={styles.wrapper_container}>
                <div className={styles.nav_container}>
                <div className={styles.user_details}>
                    <p className={styles.user_name}>Hello, <span>{session.user.name}</span></p>
                    <p className={styles.user_email}>{session.user.email}</p>
                </div>

                <div className={styles.navigation_list}>
                    <ul>
                        <Link href={''}><li>
                            <i class="bi bi-archive-fill"></i>
                            Orders</li></Link>
                        <Link href={''}><li>
                            <i class="bi bi-clipboard-heart-fill"></i>
                            Wishlist</li></Link>
                        <Link href={''}><li>
                            <i class="bi bi-bag-fill"></i>
                            Bag</li></Link>
                        <Link href={''}><button>Logout</button></Link>
                    </ul>
                </div>
            </div>   
            </div>
             
    )
}
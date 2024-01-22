import { useSession, signOut  } from "next-auth/react"
import { useRouter } from "next/router"

import styles from '@/styles/User.module.css'
import Login from "./login"
import Link from "next/link"

export default function UserPage(){

    const {data:session} = useSession()

    const router = useRouter()

    return (
        <>
            {session?
            <div className={styles.page_container}>
                <div className={styles.user_details}>
                    <p className={styles.user_name}>Hello, <span>{session.user.name}</span></p>
                    <p className={styles.user_email}>Email: {session.user.email}</p>
                </div>

                <div className={styles.navigation_list}>
                    <ul>
                    <Link href={'/orders'}><li>
                            <i class="bi bi-archive-fill"></i>
                            Orders</li></Link>
                        <Link href={'/wishlist'}><li>
                            <i class="bi bi-clipboard-heart-fill"></i>
                            Wishlist</li></Link>
                        <Link href={'/bag'}><li>
                            <i class="bi bi-bag-fill"></i>
                            Bag</li></Link>
                        <button onClick={signOut}>Logout</button>
                    </ul>
                </div>
            </div>    
        :
            <Login />
        }
        </>
    )
}
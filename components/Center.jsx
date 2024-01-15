import styles from '@/styles/Center.module.css'

export default function Center({children}){

    return (
        <div className={styles.container}>{children}</div>
    )
}
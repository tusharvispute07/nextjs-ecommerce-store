import styles from '@/styles/Welcome.module.css'

export default function Welcome(){
    
    return(
    
        <div className={styles.container}>
            <p className={styles.text}>Welcome to <span className={styles.title}> BELLA VUE </span> fashion! </p>
        </div>
        
    )
}
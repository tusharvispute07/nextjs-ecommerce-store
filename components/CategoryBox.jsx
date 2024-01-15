import styles from "@/styles/CategoryBox.module.css"

export default function CategoryBox({categoryTitle, image}){

    return(
        <div className={styles.box_container}>
            <div className={styles.image_container}>
                <img className={styles.image} src={image} alt="" />
                </div>
                <div className={styles.category_title}>
                    <p >{categoryTitle}</p>
            </div>
        </div>
    )
}
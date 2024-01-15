import CategoryBox from "./CategoryBox";
import styles from "@/styles/Clothing.module.css"
import Link from "next/link";

export default function Accessories({accessories}){

    return(
        <div className={styles.clothing_container}>
            <h3 className={styles.title}>Accessories</h3>
            <div className={styles.clothing_section}>
                {accessories.map(accessory=>
                    (<CategoryBox  key={accessory[0]._id} 
                        image={accessory[0].images[0]}
                        categoryTitle={accessory[0].categoryTitle}
                        />)
                )}
                <div className={styles.view_all}>
                    <Link href={'/acessories'}><p>VIEW ALL</p></Link>
                </div> 
            </div>
        </div>
        
    )
}
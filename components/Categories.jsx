import CategoryBox from "./CategoryBox";
import styles from "@/styles/Clothing.module.css";
import Link from "next/link";

export default function Categories({ categories }) {
    return (
        <div className={styles.clothing_container}>
            <div className={styles.clothing_section}>
                
            {categories.map(category => (
                <div key={category.id}>
                    <Link href={`/category/${category.name}`}>
                    <CategoryBox
                        image={category.image}
                        categoryTitle={category.name}
                    />
                    </Link>
                </div>
            ))}
            <Link href={'/collection'}>
                        <div className={styles.view_all}>
                            <p className={styles.view_all_text}>
                                VIEW ALL
                            </p>
                        </div>
                    </Link>
            </div>
            
        </div>
    )
}

import styles from "@/styles/NewProducts.module.css"
import ProductBox from "./ProductBox";


export default function NewProducts({products}){

    return(
        <>
        <div className={styles.title}><p>NEW ARRIVALS</p></div>
        <div className={styles.products_container}>
            {products?.length>0 && products.map(product =>(
                <ProductBox key={product._id.toString()} {...product}/>
            ))}
        </div>
        </>
    )
}

import styles from "@/styles/BagProduct.module.css"
import { useContext } from "react"
import { BagContext } from "./BagContext"
import Link from "next/link"

export default function BagProduct(
    {
    product,
    quantity,
    properties
}
){  
    const {bagProducts, setBagProducts} = useContext(BagContext)

    function increaseQuantity(id){
        const index = bagProducts.findIndex((item) => item.id === id && JSON.stringify(properties)  === JSON.stringify(item.properties))
        if (index != -1){
            const updatedProducts = [...bagProducts]
            updatedProducts[index].quantity+=1
            setBagProducts(updatedProducts)
        }
    }
    function decreaseQuantiy(id){
        const index = bagProducts.findIndex((item) => item.id === id && JSON.stringify(properties)  === JSON.stringify(item.properties))
        if (index != -1){
            const updatedProducts = [...bagProducts]
            if (bagProducts[index].quantity>1){
                updatedProducts[index].quantity-=1
            }else{
                updatedProducts.splice(index,1)
            }
        setBagProducts(updatedProducts)
        }
        
        
    }
    if(bagProducts.length>0){
        return (
            <div className={styles.product_container}>
                <div className={styles.box1}>
                <div className={styles.image_container}>
                    <Link href={`/product/${product._id}`}><img src={product.images[0]} alt="" /></Link> 
                </div>

                <div className={styles.product_details}>
                    
                <Link href={`/product/${product._id}`}><p className={styles.product_title}>{product.title}</p></Link>
                        <div className={styles.property_container}>
                            <p className={styles.property}>Price: Rs. {product.price}</p>
                            <div>
                                {Object.keys(properties).map((key,index) => (
                                    <p key={index} className={styles.property}>{key}:{properties[key]} </p>
                                ))}
                            </div>
                        </div>  
                </div>
                </div>
                
                <div className={styles.box2}>
                <div className={styles.quantity}>
                            <p id={styles}>Quantity</p> 
                            <button onClick={()=>decreaseQuantiy(product._id)}>-</button>
                            <p id={styles.quantity_value}>{quantity}</p>
                            <button onClick={()=>increaseQuantity(product._id)}>+</button>
                </div>
                </div>
                
                
            </div>
        )
    }
}

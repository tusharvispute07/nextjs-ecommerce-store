import styles from "@/styles/OrderBox.module.css"
import UserReview from "./UserReview"
import { useState } from "react"
import Link from "next/link"

export default function OrderBox({order}){

    const [isToggle, setIsToggle] = useState(false)

    return(
        <div key={order._id.toString()} className={styles.orders_container}>
            <div className={styles.order_detail} onClick={()=>setIsToggle(!isToggle)}>
                <div>
                    <i class="bi bi-box-fill"></i>
                    <span> {order.order_status}</span>
                </div>
                <i class="bi bi-caret-down"></i>
            </div>
            
            <div className={isToggle?styles.order_title_container+' '+styles.container_visible:styles.order_title_container+' '+styles.container_hidden}>
                <p><span id={styles.title}>Order ID:</span> {order._id.toString()}</p>
                <p><span id={styles.title}>Order Status:</span> <span>{order.order_status}</span></p>
                <p><span id={styles.title}>Placed on:</span> {(new Date(order.createdAt)).toLocaleDateString()}</p>
            </div>
            
            {order.line_items.map((item, index) => (
                <div key={index} className={styles.product_container}>
                    <div className={styles.product_container_left}>
                        <img className={styles.product_image} src={item.price_data.product_data.metadata.image} alt="" />
                        <div className={styles.product_details}>
                            <p className={styles.product_title}>{item.price_data.product_data.name}</p>
                            <p className={styles.product_properties}>{item.price_data.product_data.metadata.size} | {item.price_data.product_data.metadata.color}</p>
                            <UserReview 
                            productId={item.price_data.product_data.metadata.product_id?.toString()} 
                            userId={order.user}
                            />
                            <Link href={`/review?productId=${item.price_data.product_data.metadata.product_id?.toString()}&userId=${order.user}`}>Write review</Link>
                        </div>
                        
                    </div>
                    
                   

                    <div className={styles.product_container_right}>
                        <div className={styles.price_container}>
                            <p className={styles.price}>₹{item.price_data.unit_amount/100}</p>
                            <p className={styles.quantity}>QTY: {item.quantity}</p>
                        </div>

                    </div>
    
            </div>
            ))}  
        </div>
    
    )
}
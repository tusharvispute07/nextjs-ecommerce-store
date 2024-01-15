import styles from "@/styles/OrderBox.module.css"

export default function OrderBox({order}){

    return(
        <div className={styles.orders_container}>
            <div className={styles.order_title_container}>
                <p><span id={styles.title}>Order ID:</span> {order._id.toString()}</p>
                <p><span id={styles.title}>Order Status:</span> <span>Confirm</span></p>
                <p><span id={styles.title}>Placed on:</span> {(new Date(order.createdAt)).toLocaleDateString()}</p>
            </div>
            
            {order.line_items.map(item => (
                <div className={styles.product_container}>
                    <div className={styles.product_container_left}>
                        <img className={styles.product_image} src={item.price_data.product_data.metadata.image} alt="" />
                        <div className={styles.product_details}>
                            <p className={styles.product_title}>{item.price_data.product_data.name}</p>
                            <p className={styles.product_properties}>{item.price_data.product_data.metadata.size} | {item.price_data.product_data.metadata.color}</p>
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
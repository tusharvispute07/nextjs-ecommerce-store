import Center from "@/components/Center";
import Header from "@/components/Header";
import OrderBox from "@/components/Orderbox";
import styles from "@/styles/Orders.module.css"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function OrdersPage(){

    const {data:session} = useSession()
    console.log(session)

    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    
    async function fetchOrders(){
        try{
            if(session){
                const response = await axios.post('/api/orders', {email:session.user.email})
                setOrders(response.data)
                console.log("these are the orders", orders)
            }
        }catch(error){
            console.log("Error fetching the orders", error)
        }
    }

    async function fetchProducts(){
        if (orders.length>0){
            const productIds = orders.line_items.map(item => (
                item.price_data.product_data.id
                )
            )
            const response = await axios.post('/api/bag',{ids:productIds})
            setProducts(response.data)
        }
    }

    useEffect(()=>{
        fetchOrders()
    },[session])

    return(
        <>
            <Header />
            <div className={styles.page_container}>
                <div className={styles.title_container}>
                    <svg id={styles.svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                        <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z"/>
                    </svg>
                    
                    <p className={styles.page_title}>Your Orders</p>
                    </div>
                    {orders.length>0 ? orders.map(order=> 
                        (<OrderBox
                            key={order._id.toString()}
                            order={order}
                            />))
                        :
                        <p className={styles.title_container}>You don&apos;t have any orders to display.</p>
                        
                        }          
            </div>
        </>
            
        
    )
}
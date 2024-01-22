import Header from "@/components/Header";
import OrderBox from "@/components/OrderBox";
import styles from "@/styles/Orders.module.css"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function OrdersPage(){

    const {data:session} = useSession()


    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    
    async function fetchOrders(){
        try{
            if(session){
                const response = await axios.post('/api/orders', {email:session.user.email})
                setOrders(response.data)
                
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
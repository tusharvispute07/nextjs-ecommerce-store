import Center from "@/components/Center"
import Header from "@/components/Header"
import styles from "@/styles/Wishlist.module.css"
import { WishlistContext } from "@/components/WishlistContext"
import { useContext, useEffect, useState } from "react"
import ProductBox from "@/components/ProductBox"
import axios from "axios"
import Link from "next/link"

export default function WishlistPage(){
    const {wishlistedProducts, setWishlistedProducts} = useContext(WishlistContext)
    const [products, setProducts] = useState([])

    useEffect(()=>{
        if (wishlistedProducts.length>0){
            const ids = wishlistedProducts
            axios.post('/api/wishlist', {ids:ids}).then(response=>{
                setProducts(response.data)
            })
        }else{
            setProducts([])
        }
    }, [wishlistedProducts])


    return(
        <>
        <Header />
            <div className={styles.page_container}>
                {wishlistedProducts.length>0?
                <div className={styles.title_container}>
                    <svg id={styles.svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                    <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                    </svg>
                    <p className={styles.page_title}>Your Wishlist</p>
                </div>
            :    
            <div className={styles.title_container_empty}>
                <svg id={styles.svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-heart" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                </svg>
                <p className={styles.page_title}>Your Wishlist is Empty</p>
                <p className={styles.sub_title}>Add new products to your wishlist</p>
                <Link href={'/categories'}><button>Explore</button></Link>
                
            </div>
        }
                            
                <div className={styles.products_container}>

                    {products.length>0 && products.map(product => (
                        <ProductBox  key={product._id} {...product} />
                    ))}
                    
                </div>
            
            </div>
            </>

    )
}
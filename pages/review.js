import Header from "@/components/Header"
import UserReview from "@/components/UserReview"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/product"
import styles from "@/styles/ReviewPage.module.css"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

export default function ReviewPage({product}){
    const router = useRouter()
    const {userId, productId} = router.query

    const [comment, setComment] = useState('')

    function handleCommentChange(ev){
        setComment(ev.target.value)
    }

    async function handleReviewSubmission(){
        if (comment){
            const data = {
                productId:productId,
                userId:userId,
                comment: comment
            }
            try{
                await axios.post('/api/review',data)
                setComment('')
            }catch(error){
                console.log("Error posting review", error)
            }
            
        }
    }

    return (
        <>
        <Header />
        <div className={styles.container}>
            <p className={styles.page_title}>Review Page</p>
            <div>
                <div className={styles.product_container}>
                    <img src={product.images[0]}/>
                    <p>{product.title}</p>
                </div>

                <div className={styles.ratings_container}>
                    <p>How would you rate this product? </p>
                    <UserReview
                    productId={productId}
                    userId={userId}
                    setComment={setComment}
                    />
                </div>

                <div className={styles.review_container}>
                    <p>Write Review</p>
                    <textarea
                    rows="8" 
                    cols="35"
                    onChange={handleCommentChange}
                    value={comment}
                    ></textarea>
                </div>
                <button
                onClick={handleReviewSubmission}
                type="button"
                >Submit</button>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps({query}){

    await mongooseConnect()
    const product = await Product.findOne({_id:query.productId})
    
    return {
        props:{
            product: JSON.parse(JSON.stringify(product))
        }
    }

}
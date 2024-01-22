import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/product"

export default async function handler(req, res){
    if (req.method==="GET"){
        await mongooseConnect()
        const {productId, userId} = req.query
        const product = await Product.findOne({_id:productId})
        if (product){
            const filteredReview = product.ratings.filter(rating => rating.user.toString() === userId)
            const review = filteredReview[0]
            return res.json(review)
        }
        return res.status(200)
    }
    if (req.method==="POST"){
        await mongooseConnect()
        const {productId, userId, rating, comment, username} = req.body
        console.log("details", req.query)
        const updateObject = {
            ...(rating !== null && rating !== undefined ? { 'ratings.$.rating': rating} : {}),
            ...(comment !== null && comment !== undefined ? { 'ratings.$.comment': comment } : {}),
          }

        const updatedReview = await Product.findOneAndUpdate(
            {
                _id:productId,
                'ratings.user':userId
            }, 
            {
                $set: updateObject
            },
            {
                new: true 
            }
          )
        if (!updatedReview){
            const newReview = {
                user: userId,
                rating: rating,
                comment: comment,
                username: username
            }
            const product = await Product.findByIdAndUpdate(
                productId,
                {$push: {ratings:newReview}}
            )
            console.log("This is the product",product)
            return res.status(200).json({message:"review created successfully"})
        }
        return res.status(200).json({message:"reviw updated successfully"})
    }

}
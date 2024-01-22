import mongoose, { Schema, model, models } from "mongoose"
import { Category } from "./category"

const ReviewSchema = new Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    username: {type:String, required:true},
    rating: {type:Number, required:true},
    comment: String,
},
{
    timestamps:true
})

const ProductSchema = new Schema({
    title: {type:String, required:true},
    description: String,
    price: {type:Number, required:true},
    discount: {type:Number},
    images: [{type:String}],
    category: {type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    properties: {type:Object},
    ratings: [ReviewSchema],
}, {
    timestamps:true,
})


export const Product = models.Product || model('Product', ProductSchema)


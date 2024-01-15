import mongoose, { Schema, model, models } from "mongoose"
import { Category } from "./category"

const ProductSchema = new Schema({
    title: {type:String, required:true},
    description: String,
    price: {type:Number, required:true},
    discount: {type:Number},
    images: [{type:String}],
    category: {type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    properties: {type:Object},
}, {
    timestamps:true,
})


export const Product = models.Product || model('Product', ProductSchema)


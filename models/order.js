import { model, Schema, models } from "mongoose";

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    line_items: Object,
    name:String,
    city:String,
    pinCode:String,
    address:String,
    country:String,
    paid:{type:Boolean}
}, {
    timestamps:true,
})

export const Order = models?.Order || model('Order', OrderSchema)
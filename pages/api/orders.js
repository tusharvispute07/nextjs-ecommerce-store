import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
import { User } from "@/models/user";

export default async function(req, res){
    try{
        await mongooseConnect()
        const {email} = req.body

        const user = await User.findOne({email:email})
        if (!user){
            return res.status(404).json({message:"user not found"})
        }
        const orders = await Order.find({user:user._id})
        console.log("these are the orders", orders)

        res.json(orders);
    }catch(error){
            console.error('Error fetching orders:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}

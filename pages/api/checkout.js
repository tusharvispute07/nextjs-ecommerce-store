import { mongooseConnect } from "@/lib/mongoose"
import { Order } from "@/models/order"
import { Product } from "@/models/product"
import { User } from "@/models/user"
const stripe = require('stripe')(process.env.STRIPE_SK)

export default async function handler(req, res){
    if (req.method !='POST'){
        res.json('Invalid request')
        return
    }
    const {
        name,
        email, 
        mobileNumber, 
        addressLine1, 
        addressLine2, 
        pincode, 
        city, 
        state, 
        country,
        bagProducts
    } = req.body
    const modifiedBagProducts = bagProducts.map(item => {
        const newProperties = {}
        for (const [key,value] of Object.entries(item.properties)){
            newProperties[key.toLowerCase()] = value
        }
        return {...item, properties: newProperties}
    })
    await mongooseConnect()
    console.log("This is the email", email)
    const user = await User.findOne({email:email})
    const userId = user._id
    console.log("This is the userID",userId)
    let customer = await stripe.customers.list({ email });

    if (customer.data.length === 0) {
        // If the customer doesn't exist, create a new customer
        customer = await stripe.customers.create({
            email,
            name,
            address: {
                line1: addressLine1,
                line2: addressLine2,
                city,
                state,
                postal_code: pincode,
                country,
            },
        });
    } else {
        // If the customer already exists, retrieve the existing customer
        customer = customer.data[0];
    }

    const productIds = modifiedBagProducts.map(product => product.id)
    const productsInfo = await Product.find({ _id: { $in: productIds } })
    let line_items = []
    let totalAmount = 0;
    for (const item of modifiedBagProducts){
        const product = productsInfo.find(p => p._id.toString() === item.id)
        const quantity = item.quantity
        if (quantity>0 && product){
            const unitAmountInPaise = Math.round(quantity * product.price * 100); // Convert to paise
            totalAmount += unitAmountInPaise;
            line_items.push({
                quantity,
                price_data:{
                    currency:'INR',
                    product_data:{
                        name:product.title,
                        metadata: {
                            size: item.properties.size,
                            color: item.properties.color,
                            image: product.images[0]
                        },
                    },
                    unit_amount: unitAmountInPaise
                },
            })
        }
        
    }
    console.log(line_items)
    const address = addressLine1+', '+addressLine2
    const orderDoc = await Order.create({
        user:userId,
        line_items,name,mobileNumber,address,pincode,city,state,country,paid:false
    })

    const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items,
        mode:'payment',
        success_url: process.env.PUBLIC_URL + '/bag?success=1',
        cancel_url:process.env.PUBLIC_URL + '/bag?canceled=1',
        metadata: {orderId:orderDoc._id.toString()}
    })

    res.json({
        url:session.url
    })
}
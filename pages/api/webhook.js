import { mongooseConnect } from "@/lib/mongoose"
import { Order } from "@/models/order";
const stripe = require('stripe')(process.env.STRIPE_SK)
import {buffer} from 'micro'

const endpointSecret = "whsec_f29da90fb32349c76b6d6952af9a9390957b391f25e0be64af1e1a03c79e93ea";


export default async function handler(req, res){
    await mongooseConnect()
    const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId
      const paid = data.payment_status === 'paid'
      if (orderId && paid){
        await Order.findByIdAndUpdate(orderId, {paid:true})
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send('ok')
}

export const config = {
    api:{bodyParser:false}
}
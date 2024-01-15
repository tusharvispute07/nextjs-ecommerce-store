import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handler(req, res) {
    await mongooseConnect();
    const ids = req.body.ids;
    try {
        console.log("Ids reached api",ids)
        const products = await Product.find({ _id: { $in: ids } });
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
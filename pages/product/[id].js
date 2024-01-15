import Center from "@/components/Center";
import Header from "@/components/Header";
import SingleProduct from "@/components/SingleProduct";
import { Product } from "@/models/product";


export default function ProductPage({product}){

    return (
        <Center>
            <Header />
            <SingleProduct
                product={product}
            />
        </Center>
    )
}

export async function getServerSideProps({query}){

    const {id} = query

    const product = await Product.findOne({_id:id}).lean()
    product._id = product._id.toString()
    product.category = product.category.toString()
    product.updatedAt = product.updatedAt?product.updatedAt.toString():null
    return {
        props:{
            product,
        }
    }
}


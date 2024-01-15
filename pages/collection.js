import Center from '@/components/Center'
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose'
import {Product} from "@/models/product"
import {Category} from "@/models/category"
import Collection from '@/components/Collection'

async function getAllProducts(){
    await mongooseConnect()
    const products = await Product.find().lean()
   
    const productsWithStringIds = products.map(product => ({
        ...product,
        _id: product._id.toString(),
        category: product.category.toString(),
        updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null
    }));

    return productsWithStringIds;
}
async function getAllCategories(){
    const categories = await Category.find({parent:null}).lean()
    const categoriesWithString = categories.map(category => ({
        ...category,
        _id:category._id.toString(),
        parent: category.parent?category.parent.toString():null
    }))
    return categoriesWithString
}

export default function collection({products, navData}){

    return (
        <>  
            <Header />
            <Collection
            products={products}
            navData={navData}
            /> 
        </>
                       
    )
}

export async function getServerSideProps(){
    const products = await getAllProducts()
    const navData = await getAllCategories()
    return{
        props:{
            products,
            navData
        }
    }
}
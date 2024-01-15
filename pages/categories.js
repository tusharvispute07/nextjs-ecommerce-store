import Center from '@/components/Center'
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose'
import Categories from '@/components/Categories'
import {Product} from "@/models/product"
import {Category} from "@/models/category"


async function getCategoryData(category){
    if(!category){
        return null
    }
    const product = await Product.findOne({category:category._id}).lean()
    if (product){
        return product
    }else{
        const childCategory = await Category.findOne({parent:category._id}).lean()
        return getCategoryData(childCategory)
    }
}
async function getAllCategories(){
    await mongooseConnect()
    const superCategories = await Category.find({parent:null}).lean()
    const categories = []
    for (const superCategory of superCategories){
        const product = await getCategoryData(superCategory)
        if (product){
            const category = {
                id: superCategory._id.toString(),
                name: superCategory.name, 
                image:product.images[0]
            }
            categories.push(category)
        }
    }
    return categories
}

export default function collection({categories}){

    return (
        <>
            <Header />
            <Categories categories={categories}/>     
        </>
               
 
    )
}

export async function getServerSideProps(){
    const categories = await getAllCategories()
    console.log(categories)

    return{
        props:{
            categories
        }
    }
}
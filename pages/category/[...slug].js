import { useRouter } from "next/router";

import { Product } from "@/models/product";
import { Category } from "@/models/category";
import Collection from "@/components/Collection";

import { NavDataContext } from "@/components/NavDataContext";
import { useContext, useEffect } from "react";
import Header from "@/components/Header";


export default function DynamicPage({products, navData}){

    const {setNavPanelData} = useContext(NavDataContext)
    useEffect(()=>{
        setNavPanelData(navData)
    },[navData])

    const router = useRouter()
    const {slug} = router.query

    return (
        <>
            <Header />
            <Collection products={products}
                        navData={navData}
            />
        </>
            
    )
}
function makeNavDataObject(parentArray, childArray, myObject){
    for (let i = 0; i < parentArray.length; i++) {
        if (parentArray[i].name === myObject.name) {
          parentArray[i].children = childArray
          break;
        }
      }
    return parentArray
}
async function getNavPanelData(urlArray){
    let parents = null
    let children = null
    const activeCategoryString = urlArray[urlArray.length-1]
    const activeCategory = await Category.findOne({name:activeCategoryString})
    
    if (urlArray.length<3){
        parents = await Category.find({parent:null}).lean()
        children = await Category.find({parent:activeCategory._id}).lean()
        
        if (children.length===0){
            const newParentCategoryString = urlArray[urlArray.length-2]
            if (newParentCategoryString===undefined){
                console.log('this is the nav data', parents)
                return parents
            }
            const newParentCategory = await Category.findOne({name: newParentCategoryString}).lean()
            children = await Category.find({parent:newParentCategory._id}).lean()
            const navPanelData = makeNavDataObject(parents, children, newParentCategory)
            return navPanelData    
        }
        const navPanelData = makeNavDataObject(parents, children, activeCategory)
        return navPanelData
    }

    if (urlArray.length>=3){
        const parentName = urlArray[urlArray.length-2]
        const parent = await Category.findOne({name:parentName})

        children = await Category.find({parent:activeCategory._id})
        if (children){
            parents = await Category.find({parent:parent._id}).lean()
            const navPanelData = makeNavDataObject(parent,children,activeCategory)
            return navPanelData
        }else{
            const grandParentName = urlArray[urlArray.length-3]
            const grandParent = await Category.findOne({name:grandParentName})

            children = await Category.find({parent:parent._id}).lean()
            parents = await Category.find({parent:grandParent._id}).lean() 
            const navPanelData = makeNavDataObject(parent,children,activeCategory)
            return navPanelData
        }
    }
}
// allCategories = []
async function getPageData(urlArray){
    const allProducts = []
    const lastCategory = urlArray[urlArray.length-1]
    const initialCategory = await Category.findOne({name:lastCategory})
    const allCategories = [initialCategory]

    while (allCategories.length>0){
        const currentCategory = allCategories.pop()
        if (!currentCategory){
            return
        }
        const products = await Product.find({category:currentCategory._id}).lean() 
        
        const children = await Category.find({parent:currentCategory._id}).lean()
        
        if (products){
            allProducts.push(...products)
        }
        if (children){
            allCategories.push(...children)
        }
    }
    return allProducts
}

function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

export async function getServerSideProps({params}){
    const url = params.slug
    const urlArray = url.map(capitalizeFirstLetter);


    const allProducts = await getPageData(urlArray)
    const navPanelData = await getNavPanelData(urlArray)
    console.log(navPanelData)
    

    const products = allProducts.map((product) => {
        return {
          ...product,
          _id: product._id.toString(),
          category: product.category.toString(),
          updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null,
        };
      });
    
      const navData = navPanelData.map((parentObject) => {
        if (parentObject.children) {
            parentObject.children = parentObject.children.map((childObject) => {
                return {
                    ...childObject,
                    _id: childObject._id.toString(),
                    parent: childObject.parent ? childObject.parent.toString() : null
                };
            });
            return {
                ...parentObject,
                _id: parentObject._id.toString(),
                parent: parentObject.parent ? parentObject.parent.toString() : null
            };
        }
        return {
            ...parentObject,
            _id: parentObject._id.toString(),
            parent: parentObject.parent ? parentObject.parent.toString() : null
        };
    });

    return{
        props:{
            products,
            navData,
        }
    }
}
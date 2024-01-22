import styles from '@/styles/SingleProduct.module.css'

import { useContext, useState, useEffect } from 'react'
import { BagContext } from './BagContext'
import Link from 'next/link'

import SingleProductSlider from './SingleProductSlider'
import SingleProductReviews from './SingleProductReviews'

export default function SingleProduct({product}){
    const {setBagProducts, bagProducts} = useContext(BagContext)
    const [selectedValues, setSelectedValues] = useState({}) 
    const [propertyError, setPropertyError] = useState('') 

    

    const [ispurchaseButtonClicked, setIsPurchaseButtonClicked] = useState(false)
    function handlePropertiesChange(property,value){
        setSelectedValues((prevSelectedValues) => ({
            ...prevSelectedValues,
            [property]: value,
            
          }));
          setPropertyError('')
        };

    function addProductToBag(){
        
        const productProperties = product.properties
        const missingProperties = productProperties.filter(
            (property) => !selectedValues[property.name]
        )
        if (missingProperties.length > 0) {
            const missingPropertiesNames = missingProperties.map((property) => `${property.name.toLowerCase()}`);
            setPropertyError(`please select a: ${missingPropertiesNames.join(', ')}`);
            return;
        }
        setIsPurchaseButtonClicked(true)
        const existingProductIndex = bagProducts.findIndex(
            (item) =>
            item.id === product._id &&
            JSON.stringify(item.properties) === JSON.stringify(selectedValues)
        )
        if (existingProductIndex != -1){
            const updatedBagProducts = [...bagProducts]
            updatedBagProducts[existingProductIndex].quantity += 1
            setBagProducts(updatedBagProducts)
        }else{
            const newProduct = {
                id: product._id,
                properties: selectedValues,
                quantity:1
            }
            setBagProducts((prev)=>[...prev, newProduct])
        }
        
    }  useEffect(() => {
        console.log('this is updated bag of products', bagProducts);
      }, [bagProducts]);

    return (
        <div className={styles.page_container}>
            <div className={styles.product_container}>
                <SingleProductSlider images={product.images} id={product._id}/>
    
                <div className={styles.product_details}>
                    <p className={styles.product_title}>{product.title}</p>
                    <p className={styles.product_price}>MRP Rs. {product.price}</p>
                    <p className={styles.price_detail}>Inclusive of all taxes</p>
                    <p className={styles.about_product}>Perfect product for a casual look. Add this to your wardrobe & Ramp up your styles with this beautiful article.</p>
                    {product.properties.map(property => (
                        <div className={styles.properties} key={property.name}>
                        <p className={styles.property_name}>{property.name.toLowerCase()}:</p>
                        {property.values.map(value => (
                            <label key={value} className={styles.property_button}>
                                <input type='radio' 
                                value={value} 
                                name={property.name} 
                                checked={selectedValues[property.name]===value}
                                onChange={()=> handlePropertiesChange(property.name, value)}
                                />
                                <span>{value}</span>
                            </label>
                            
                        ))}
                        
                        </div>
                        
                    ))}
                     <p className={styles.property_error}>
                        {propertyError || '\u00A0'}
                    </p>
                    
                    <div className={styles.button_container}>
                        {ispurchaseButtonClicked?
                        <Link href={'/bag'}>
                            <button 
                
                                className={`${styles.bag_button} ${ispurchaseButtonClicked ? styles.button_visible : ''}`}>
                            GO TO BAG
                        </button>
                        </Link>
                        :
                        <button 
                        onClick={addProductToBag}
                        className={styles.purchase_button}>
                            ADD TO BAG
                        </button>
                        }
                    </div>
                    
                    <p className={styles.product_description_title}>Product Description</p>
                    <p className={styles.product_description_content}>
                        {product.description}
                    </p>
                </div>
             </div>
             <div className={styles.reviews_container}>
                <p className={styles.reviews_title}>Ratings & Reviews <i class="bi bi-caret-down"></i></p>
             {product.ratings?.length>0? product.ratings.map( review => (
                <div key={review._id}>
                    <SingleProductReviews productReview={review} />
                </div>
             ) 
             ):
             <p className={styles.no_reviews}>No reviews on this product yet.</p>
             }
             </div>
             
             
        </div>
    )
}


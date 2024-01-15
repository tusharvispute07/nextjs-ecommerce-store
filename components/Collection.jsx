
import ProductBox from "./ProductBox"
import styles from "@/styles/Collection.module.css"
import { useState, useMemo } from "react"
import Pagination from "./Pagination"
import Link from "next/link"

export default function Collection({products, navData}){

    const itemsPerPage = 8
    const [currentPage, setCurrentPage] = useState(1)
    const [checkboxes, setCheckboxes] = useState({
        price0to499: false,
        price499to999: false,
        price999to2999: false,
        price2999to5000: false,
        priceAbove5000: false,
      });

    const indexOfLastItem = currentPage*itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const filteredProducts = useMemo(() => {
        if (Object.values(checkboxes).every((value) => !value)) {
            return products;
          }
        return products.filter((product) => {
          const price = product.price; 
          if (checkboxes.price0to499 && price >= 0 && price <= 499) {
            return true;
          }
          if (checkboxes.price499to999 && price >= 499 && price <= 999) {
            return true;
          }
          if (checkboxes.price999to2999 && price >= 999 && price <= 2999) {
            return true;
          }
          if (checkboxes.price2999to5000 && price >= 2999 && price <= 5000) {
            return true;
          }
          if (checkboxes.priceAbove5000 && price > 5000) {
            return true;
          }
          return false;
        });
      }, [products, checkboxes]);

    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

    function handlePageChange(pageNumber){
        setCurrentPage(pageNumber)
    }

    function handleCheckboxChange(checkboxName) {
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          [checkboxName]: !prevCheckboxes[checkboxName],
        }));
      }

      const price0to499 = 'price0to499';
      const price499to999 = 'price499to999';
      const price999to2999 = 'price999to2999';
      const price2999to5000 = 'price2999to5000';
      const priceAbove5000 = 'priceAbove5000';

    return(
            <div className={styles.page_container}>

                <div className={styles.sub_categories}>
                    {navData.map((parentElement) => (
                        parentElement.children?.length>0 && (
                            parentElement.children.map((childElement,index) => (
                                <Link key={index} href={'/category/'+childElement.url}>{childElement.name}</Link>
                            ))
                        )
                    ))}
                    
                </div>
                <div className={styles.collection_container}>
                    <div className={styles.side_bar}>
                        <div className={styles.categories}>
                            <p className={styles.category_title}>Categories</p>
                            <div className={styles.category_content}>
                                <ul className={styles.nav_list_parent}>
                                    {navData.map((parentElement, index) => (
                                        <li id={styles.nav_item_parent} key={parentElement._id}>
                                            <Link href={'/category'+parentElement.url||''}><p>{parentElement.name}</p></Link>
                                            {parentElement.children && (
                                                <ul className={styles.nav_list_child}>
                                                    {parentElement.children.map((childElement, index) => (
                                                        <Link key={index} href={'/category'+childElement.url||''}><li id={styles.nav_item_child}key={childElement._id}>{childElement.name}</li></Link>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <p className={styles.category_title}>Filter</p>
                                <div className={styles.price_filter}>
                                   <p>Price:</p>
        
                                    <div key={1} id={styles.checkbox_inputs}>
                                        <input
                                        type="checkbox"
                                        checked={checkboxes[price0to499]}
                                        onChange={() => handleCheckboxChange(price0to499)}
                                        />
                                        <label>Rs.0-499</label>
                                    </div>

                                    <div key={2} id={styles.checkbox_inputs}>
                                        <input
                                        type="checkbox"
                                        checked={checkboxes[price499to999]}
                                        onChange={() => handleCheckboxChange(price499to999)}
                                        />
                                        <label>Rs.499-999</label>
                                    </div>

                                    <div key={3} id={styles.checkbox_inputs}>
                                        <input
                                        type="checkbox"
                                        checked={checkboxes[price999to2999]}
                                        onChange={() => handleCheckboxChange(price999to2999)}
                                        />
                                        <label>Rs.999-2999</label>
                                    </div>

                                    <div key={4} id={styles.checkbox_inputs}>
                                        <input
                                        type="checkbox"
                                        checked={checkboxes[price2999to5000]}
                                        onChange={() => handleCheckboxChange(price2999to5000)}
                                        />
                                        <label>Rs.2999-5000</label>
                                    </div>

                                    <div key={5} id={styles.checkbox_inputs}>
                                        <input
                                        type="checkbox"
                                        checked={checkboxes[priceAbove5000]}
                                        onChange={() => handleCheckboxChange(priceAbove5000)}
                                        />
                                        <label>Above Rs.5000</label>
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </div>
                <div className={styles.wrapper_container}>
                    <div className={styles.products_container}>
                        {currentItems?.length>0 && currentItems.map((item,index) =>(
                            <ProductBox key={index} {...item}/>
                        ))}
                    </div>
                    {!currentItems?.length>0 &&
                    <div className={styles.no_products}>
                            <p>No products to show</p>
                    </div>
                    }

                        <Pagination 
                        currentPage={currentPage}
                        totalPages={Math.ceil(products.length/itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                    </div>
                
                </div>
               
                </div>      
    )
}

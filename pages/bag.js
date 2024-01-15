import Center from "@/components/Center";
import Header from "@/components/Header";
import Bag from "@/components/Bag";
import {useEffect, useState, useContext } from "react";
import axios from "axios";
import { BagContext } from "@/components/BagContext";

export default function BagPage() {
  const [products, setProducts] = useState([]);
  const {bagProducts} = useContext(BagContext)
  
  async function fetchAndSetProducts() {
    const ids = bagProducts.map((product) => product.id);
    try {
      const response = await axios.post('/api/bag', {ids:ids});
      setProducts(response.data)
      console.log(products)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(()=>{
    if (bagProducts.length>0){
      fetchAndSetProducts()
    }
    
  }, [bagProducts])

  useEffect(()=>{
    console.log("bag products", bagProducts)
  },[])

  return (
    <>
      <Header />
      <Bag products={products}
      />
    </>
      
  );
}

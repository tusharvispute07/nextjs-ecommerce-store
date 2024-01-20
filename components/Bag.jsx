// Bag.js

import styles from "@/styles/Bag.module.css";
import BagProduct from "./BagProduct";
import Link from "next/link";
import {useEffect, useState, useContext } from "react";
import axios from "axios";
import { BagContext } from "./BagContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function Bag({ products}) {
    const {bagProducts, clearBag} = useContext(BagContext)
    const {data: session} = useSession()

    const router = useRouter()

    const [totalMrp, setTotalMrp] = useState(0)
    const [shippingCharge, setShippingCharge] = useState(0)
    const [name, setName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    const [pincode, setPincode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [isSuccess,setIsSuccess] = useState(false);
    const [isCheckoutButtonClicked, setIsCheckoutButtonClicked] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }
      if (window?.location.href.includes('success')) {
        setIsSuccess(true);
        clearBag()
        
      }
    }, []);

    useEffect(() => {
      if (isSuccess) {
        clearBag();
        router.push('/bag');
      }
    }, [isSuccess]);

    const calculateTotalPrice = () => {
      
      const totalProductPrice = bagProducts.reduce((total, item) => {
        const product = products.find(product => product._id === item.id);
        const productPrice = product ? product.price * item.quantity : 0;
        return total + productPrice;
      }, 0);
      setTotalMrp(totalProductPrice);
    };
    const calculateShippingCharges = () => {
      if (totalMrp>999){
        setShippingCharge('Free Shipping')
      }
      if (totalMrp>1 && totalMrp<999){
      setShippingCharge(150)
    }else{
      setShippingCharge(0)
    }
  }
  
    useEffect(() => {
      if(bagProducts.length>0){
        calculateTotalPrice();
        calculateShippingCharges()
      }
      
    }, [bagProducts, products]);

    useEffect(() => {
      calculateShippingCharges();
    }, [totalMrp]);


    

    async function goToPayment(){
      if(!session){
        router.push('/login')
        return
      }

      if (
        !name.trim() ||
        !mobileNumber.trim() ||
        !addressLine1.trim() ||
        !addressLine2.trim() ||
        !pincode.trim() ||
        !city.trim() ||
        !state.trim() ||
        !country.trim()
      ){
        setErrorMessage("All fields are required.")
        return
      }

      const email = session.user.email
      const response = await axios.post('/api/checkout',{
        name,email,mobileNumber,addressLine1,addressLine2,pincode,city,state,country,
        bagProducts
      })
      if (response.data.url){
        window.location = response.data.url
      }
    }

    if (isSuccess){
      return (
            <div className={styles.extend_bag_container}>
              <div className={styles.box_container}>
                <h1>Thank You for Ordering!</h1>
                <p>We will let you know once your order is shipped</p>
              </div>
            </div>
      )
    }
  return (
    <div className={bagProducts.length>0?styles.wrapper_container:styles.extend_bag_container}>
      <div id={isCheckoutButtonClicked?styles.products_container_hidden:styles.products_container} className={styles.box_container} >
        {bagProducts?.length > 0 ? (
          <div>
            <div className={styles.bag_box_title}>
                    <svg
                    id={styles.bag_svg}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bag-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                    />
                  </svg>
              <p className={styles.bag_box_title}>BAG</p>
            </div>
                    {products.length > 0 && (
                      bagProducts.map((item) => (
                        <BagProduct
                          key={item._id} 
                          product={products.find((product) => product._id === item.id)}
                          quantity={item.quantity}
                          properties={item.properties}
                        />
                      ))
                    )}
                    <button 
                    className={styles.proceed_to_checkout_button}
                    onClick={()=>setIsCheckoutButtonClicked(!isCheckoutButtonClicked)}
                    >Proceed To Checkout</button>
          </div>
        ) : (
          <div className={styles.empty_bag}>
            <svg id={styles.empty_bag_svg} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
            </svg>
            <h2>Your Bag is Empty!</h2>
            <p>Add new items to your bag</p>
            <Link href={'/categories'}><button>Explore</button></Link>
          </div>
        )}
      </div>

      <div id={isCheckoutButtonClicked?styles.order_container:styles.order_container_hidden} className={bagProducts.length>0?styles.box_container:styles.hide_order_container} >
       
          <div className={styles.contact_details}>
            <p className={styles.order_box_title}>CONTACT DETAILS</p>
            <div className={styles.contact_inputs}>
              <input type="text" placeholder="Name" value={name} name="name"
              onChange={ev => setName(ev.target.value)}/>
              <input type="text" placeholder="Mobile No." name="mobileNumber" pattern="[0-9]*" inputMode="numeric" value={mobileNumber}
              onChange={(ev) => {
                const inputValue = ev.target.value;
                const numericValue = inputValue.replace(/\D/g, ''); 
                setMobileNumber(numericValue);
              }}/>
            </div>
          </div>

          <div className={styles.address}>
            <p className={styles.order_box_title}>ADDRESS</p>
            <input id={styles.address} type="text" placeholder="Apartment / Building" name="addressLine1"
            value={addressLine1} onChange={ev => setAddressLine1(ev.target.value)} /> 
            <input id={styles.address} type="text" placeholder="Street / Locality / Town" name="addressLine2"
            value={addressLine2} onChange={ev => setAddressLine2(ev.target.value)} />
              <div className={styles.pincode_city}>
                <input type="text" inputMode="numeric" pattern="[0-9]*" placeholder="Pin-code" name="pincode"
                value={pincode} 
                onChange={(ev) => {
                  const inputValue = ev.target.value;
                  const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
                  setPincode(numericValue);
                }}/>
                <input type="text" placeholder="City" name="city"
                value={city} onChange={ev => setCity(ev.target.value)} />
              </div>
              <div className={styles.state_country}>
                <input type="text" placeholder="State" name="state"
                value={state} onChange={ev => setState(ev.target.value)}/>
                <input type="text" placeholder="Country" name="country"
                value={country} onChange={ev => setCountry(ev.target.value)}/>
              </div>
              <p className={styles.error_message}>{errorMessage}</p>
          </div>

        <div className={styles.payment_information}>
          <p className={styles.order_box_title}>ORDER SUMMARY</p>
            <div className={styles.order_amount}>
              <div id={styles.title}>
                  <p>Total MRP</p>
                  <p>Shipping Charges</p>
              </div>

              <div id={styles.amount}>
                  <p>₹ {totalMrp}</p>
                  <p>₹ {shippingCharge}</p>
              </div>
            </div>
          <hr />

          <div className={styles.total}>
                <p>Total Amount </p>
                <p>₹ {shippingCharge===0 ||shippingCharge==='Free Shipping'?totalMrp:totalMrp+shippingCharge}</p>
            </div>
       
        <button className={styles.confirm_button}
        onClick={goToPayment}
        >Proceed To Payment</button>
      </div>
    
     </div>
     
    </div>
  );
}
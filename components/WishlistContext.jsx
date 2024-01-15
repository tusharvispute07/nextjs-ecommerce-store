import { createContext, useEffect,  useState } from "react";

export const WishlistContext = createContext({});

export function WishlistContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [wishlistedProducts, setWishlistedProducts] = useState([]);

  useEffect(() => {
    if (ls && ls.getItem("wishlist")) {
      const storedWishlist = JSON.parse(ls.getItem("wishlist"));
      setWishlistedProducts(storedWishlist);
    }
  }, [ls]);
 
  useEffect(() => {
    if (wishlistedProducts?.length > 0) {
      ls?.setItem("wishlist", JSON.stringify(wishlistedProducts));
    }
  }, [wishlistedProducts, ls]);

  function addToWishlist(productId){
    setWishlistedProducts(prevVals =>(
        [...prevVals,
        productId]
    ))
  }

  function removeFromWishlist(productId) {
    setWishlistedProducts((prevWishlist) => {
      const index = prevWishlist.findIndex((item) => item === productId);
      if (index !== -1) {
        const newWishlist = [...prevWishlist];
        newWishlist.splice(index, 1);
        ls?.setItem("wishlist", JSON.stringify(newWishlist));
        return newWishlist;
      }
      return prevWishlist;
    });
  }

  function clearWishlist() {
    setWishlistedProducts([]);
  }

  return (
    <WishlistContext.Provider value={{wishlistedProducts, setWishlistedProducts, addToWishlist, removeFromWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
}

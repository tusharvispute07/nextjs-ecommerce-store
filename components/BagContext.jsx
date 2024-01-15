import { createContext, useEffect,  useState } from "react";

export const BagContext = createContext({});

export function BagContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [bagProducts, setBagProducts] = useState([]);

  useEffect(() => {
    if (ls && ls.getItem("bag")) {
      const storedBag = JSON.parse(ls.getItem("bag"));
      setBagProducts(storedBag);
    }
  }, [ls]);
 
  useEffect(() => {
    if (bagProducts?.length > 0) {
      ls?.setItem("bag", JSON.stringify(bagProducts));
    }else{
      ls.removeItem("bag")
    }
  }, [bagProducts, ls]);



  useEffect(() => {
  }, [bagProducts]); // Log the updated bagProducts here

  function clearBag() {
    setBagProducts([]);
  }

  return (
    <BagContext.Provider value={{bagProducts, setBagProducts, clearBag}}>
      {children}
    </BagContext.Provider>
  );
}

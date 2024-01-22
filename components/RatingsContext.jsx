import { createContext } from "react";
import {useState} from "react"

export const RatingsContext = createContext({})

export function RatingsContextProvider({children}) {

    const [ratings, setRatings] = useState([])

    return (
        <RatingsContext.Provider value={{ratings, setRatings}}>
            {children}
        </RatingsContext.Provider>
    )
}
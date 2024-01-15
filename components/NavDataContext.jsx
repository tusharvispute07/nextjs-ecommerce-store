import { createContext } from "react";
import {useState} from "react"

export const NavDataContext = createContext({})

export function NavDataContextProvider({children}) {

    const [navPanelData, setNavPanelData] = useState([])

    return (
        <NavDataContext.Provider value={{navPanelData, setNavPanelData}}>
            {children}
        </NavDataContext.Provider>
    )
}
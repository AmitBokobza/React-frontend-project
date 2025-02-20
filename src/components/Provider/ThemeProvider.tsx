import { FunctionComponent, ReactNode, useEffect, useState } from "react";


interface ThemeProviderProps {
    children:ReactNode
}
 
const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({children}) => {
    const savedTheme = localStorage.getItem("theme");
    const [theme, setTheme] = useState(savedTheme || "light");

    useEffect(() => {
        if(theme === )
    })

    useEffect(() => {

    })


    return ( 
        <>

        </>
     );
}
 
export default ThemeProvider;
import { createContext, useState, useEffect } from "react";
import { getCategories } from "../utils/utils";

//Exportamos el contexto
export const DataContext = createContext();

//Componente que representará el contexto
export const DataProvider = ({children}) => {

    //Estado que albergará -> [catName, catDir, catUrl, catComponent] x cat
    const [categories, setCategories] = useState([]);
    const [cartNumber, setCartNumber] = useState(Object.keys(localStorage).length);
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(()=>{
      //Async para manejar asincronías
      async function asyncHandler () {
        //Obtenemos los datos de la API y obtenemos un array
        const loadedCategories = await getCategories();

        //Actualizamos setCategories
        setCategories(()=>loadedCategories);
        //Actualizamos el número de productos en el carrito en funcion de LocalStorage
        setCartNumber(Object.keys(localStorage).length);
        sessionStorage.loggedIn && setLoggedIn(true);
      }
      asyncHandler();
    },[])

    return (
        <DataContext.Provider value={{categories, cartNumber, setCartNumber, loggedIn, setLoggedIn}}>
            {children}
        </DataContext.Provider>
    )
}
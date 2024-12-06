import { createContext, useState, useEffect } from "react";

import Electronics from "../pages/Electronics";
import Jewelery from "../pages/Jewelery";
import MensClothing from "../pages/MensClothing";
import WomensClothing from "../pages/WomensClothing";
import Home from "../pages/Home";
import CatSection from "../pages/CatSection";

export const DataContext = createContext();

export const DataProvider = ({children}) => {

    const [categories, setCategories] = useState([]);
    const [cartNumber, setCartNumber] = useState(Object.keys(localStorage).length);

  useEffect(()=>{
    //Almacenar los datos de la API
    async function getCategories(){
      //Fetch
      let response = await fetch('https://fakestoreapi.com/products/categories');
      let catData = await response.json();

      //Conformamos catArr con: [catName, catDir, catUrl, catComponent]
      const loadedCategories = catData.reduce((acc, curr)=>{
        let catArr = [];

        //Definimos catName y hacemos push
        let catName = curr.toUpperCase();
        catArr.push(catName);

        //Definimos catDir y hacemos push
        let catDir = curr.toLowerCase().split("").filter((char)=>{
          return char !== " " && char !== "'";
        });
        catDir = catDir.join('');
        catArr.push(catDir);

        //Definimos catUrl y hacemos push
        let catUrl = curr.toLowerCase().split("").map((char)=>{
          if(char === " "){
            char = '%20'
          }else if( char === "'"){
            char = "%27"
          }
          return char;
        });
        catUrl = catUrl.join('');
        catUrl = 'https://fakestoreapi.com/products/category/' + catUrl;
        catArr.push(catUrl);

        //Definimos catComponent y hacemos push
        let catComponent;
        switch (curr){
          case "electronics":
            catComponent = (<CatSection url={catUrl} title={catName}/>);
            break;
          case "jewelery":
            catComponent = (<CatSection url={catUrl} title={catName}/>);
            break;
          case "men's clothing" :
            catComponent = (<CatSection url={catUrl} title={catName}/>);
            break;
          case "women's clothing":
            catComponent = (<CatSection url={catUrl} title={catName}/>);
            break;
          
          default: <Home/>;
        }
        catArr.push(catComponent);
        acc.push(catArr);
        return acc;
      }, [])

      //Actualizamos categories con loadedCategories
      setCategories(()=>loadedCategories);
    }
    setCartNumber(Object.keys(localStorage).length);
    getCategories();
  },[])


    return (
        <DataContext.Provider value={{categories, cartNumber}}>
            {children}
        </DataContext.Provider>
    )
}
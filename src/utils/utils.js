import Electronics from "../pages/Electronics";
import Jewelery from "../pages/Jewelery";
import MensClothing from "../pages/MensClothing";
import WomensClothing from "../pages/WomensClothing";
import Home from "../pages/Home";

//Manejo del contador de cantidad de un producto
//Retorna el json del producto con key "count" actualizado
const getCount = (product, operation, id)=>{
    const updatedProduct = {...product};

    if(operation === 'sumar'){

        updatedProduct.count = parseInt(product.count) + 1;
        localStorage[id] = JSON.stringify(updatedProduct);

    }else if(operation === 'restar'){

        if(updatedProduct.count > 1){
            updatedProduct.count = parseInt(product.count) - 1;
            localStorage[id] = JSON.stringify(updatedProduct);
        }else if(updatedProduct.count === 1){
            localStorage.removeItem(id);
            updatedProduct.count = 0;
        }
    }
    return updatedProduct;
}



async function getCategories(){
    try{
        //Fetch
        let response = await fetch('https://fakestoreapi.com/products/categories');
        let catData = await response.json();

        //Conformamos catArr con: [catName, catDir, catUrl, catComponent] x cat
        const loadedCategories = await catData.reduce((acc, curr)=>{
            //Array para cada categoría
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
                catComponent = (<Electronics url={catUrl} title={catName}/>);
                break;
            case "jewelery":
                catComponent = (<Jewelery url={catUrl} title={catName}/>);
                break;
            case "men's clothing" :
                catComponent = (<MensClothing url={catUrl} title={catName}/>);
                break;
            case "women's clothing":
                catComponent = (<WomensClothing url={catUrl} title={catName}/>);
                break;
            
            default: <Home/>;
            }
            catArr.push(catComponent);
            acc.push(catArr);
            return acc;
        }, [])

        return loadedCategories;

    }catch(error){
        alert(error);
    }
}

export {getCount, getCategories};
import { useEffect } from "react";
import { useState } from "react";
import { getCount, productStars } from "../utils/utils";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const CatSection = ({url, title})=>{

    const {setCartNumber} = useContext(DataContext);

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const getCategory = async() =>{
            let response = await fetch(url);
            let category = await response.json();
            category.reduce((acc, curr) => {
                if(localStorage[curr.id]){
                    curr.count = JSON.parse(localStorage[curr.id]).count;
                }else{
                    curr.count = 0;
                }
                acc.push(curr);
                return acc;
            }, []);
            setProducts(category);
        }

        getCategory();
    }, [url])


    const makeCount = (product, index, operation, id)=>{
        //Obtendo el objeto de producto + count
        const updatedProduct = getCount(product, operation, id);

        const updatedProducts = [...products];
        updatedProducts.splice(index,1,updatedProduct);
        setProducts(updatedProducts);
        setCartNumber(Object.keys(localStorage).length);
    }

    return(
        <section className="main-sec main-sec--mens">
            <h2 className="main-sec-title">{title}</h2>
            {products.map((product, index)=>{
                return(
                    <article key={`article-${index}`} className="main-sec-article">
                        <h3 className="article-title">{product.title}</h3>
                        <div className="article-imgContainer">
                            <img src={product.image} className="article-img" alt={`Imagen de ${product.title}`}/>
                        </div>
                        <span>{`ID: ${product.id}`}</span>
                        <p>{product.description}</p>
                        <span>{`RATING: ${product.rating.rate}`}</span>
                        {productStars(product.rating.rate)}
                        <h3>{`PRICE: ${product.price}€`}</h3>
                        <div>
                            <span>AÑADIR AL CARRITO</span>
                            <button onClick={()=>makeCount(product, index, 'sumar', product.id)}>
                                AÑADIR
                            </button>
                            <h3>{product.count}</h3>
                            <button onClick={()=>makeCount(product, index, 'restar', product.id)}>
                                QUITAR
                            </button>
                        </div>
                        
                    </article>
                )
            })}
        </section>
    )
}

export default CatSection;
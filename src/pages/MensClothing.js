import { useEffect } from "react";
import { useState } from "react";

const MensClothing = ({url})=>{

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(()=>{
        async function getCategory(){
            let response = await fetch(url);
            let category = await response.json();
            setProducts(category);
            console.log(category);
        }

        getCategory();
    },[])

    const cartProducts = (product)=>{
        if(!localStorage[product.id]){
            localStorage[product.id] = JSON.stringify(product);
        }else{
            localStorage.removeItem(product.id);
        }
        let newCart = [...cart, product.id];
        setCart([newCart]);
    }

    return(
        <section className="main-sec main-sec--mens">
            <h2 className="main-sec-title">PRODUCTOS DE MEN´S CLOTHING</h2>
            {products.map((product, index)=>{
                return(
                    <article key={`article${index}`} className="main-sec-article">
                        <h3 className="article-title">{product.title}</h3>
                        <div className="article-imgContainer">
                            <img src={product.image} className="article-img"/>
                        </div>
                        <span>{`ID: ${product.id}`}</span>
                        <p>{product.description}</p>
                        <span>{`RATING: ${product.rating.rate}`}</span>
                        <h3>{`PRICE: ${product.price}€`}</h3>
                        <button onClick={()=>cartProducts(product)}>{localStorage[product.id] ? 'Quitar del carrito' : 'Añadir al carrito'}</button>
                    </article>
                )
            })}
        </section>
    )
}

export default MensClothing;
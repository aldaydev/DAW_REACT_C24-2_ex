import { useEffect } from "react";
import { useState } from "react";
import { getCount, cartProds } from "../utils/utils";

const MensClothing = ({url})=>{

    
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [productCount, setProductCount] = useState(false);

    useEffect(()=>{
        async function getCategory(){
            let response = await fetch(url);
            let category = await response.json();
            const catPlusCount = category.reduce((acc, curr) => {
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
    },[])

    // useEffect(()=>{
        
    // },[productCount])


    // const cartProducts = (product)=>{

    //     if(!localStorage[product.id]){
    //         localStorage[product.id] = JSON.stringify(product);
    //     }
    //     // else{
    //     //     localStorage.removeItem(product.id);
    //     // }
    //     let newCart = [...cart, product.id];
    //     setCart([newCart]);
    // }

    const makeCount = (product, index, operation, id)=>{
        const updatedProduct = getCount(product, index, operation, id);
        
        const updatedProducts = [...products];
        updatedProducts.splice(index,1,updatedProduct);
        setProducts(updatedProducts);
        cartProds(product);
        let newCart = [...cart, product.id];
        setCart([newCart]);

        console.log('updatedProduct',updatedProduct);
    }

    // const getCount = (product, index, operation, id)=>{
    //     const updatedProduct = {...product};

    //     if(operation === 'sumar'){
    //         updatedProduct.count = parseInt(product.count) + 1;
    //         localStorage[id] = JSON.stringify(updatedProduct);

    //     }else if(operation === 'restar'){
    //         if(product.count > 0){
    //             updatedProduct.count = parseInt(product.count) - 1;
    //             localStorage[id] = JSON.stringify(updatedProduct);
    //         }
    //     }
        
    //     console.log('COUNT', updatedProduct.count);
    //     const updatedProducts = [...products];
    //     updatedProducts.splice(index,1,updatedProduct);
    //     setProducts(updatedProducts);
    //     cartProducts(product);

    //     console.log('updatedProduct',updatedProduct);
    // }

    return(
        <section className="main-sec main-sec--mens">
            <h2 className="main-sec-title">PRODUCTOS DE MEN´S CLOTHING</h2>
            {console.log('ALLProducts', products)}
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
                            {/* <button 
                                onClick={()=>cartProducts(product)}>
                                {localStorage[product.id] ? 'Quitar del carrito' : 'Añadir al carrito'}
                            </button> */}
                        </div>
                        
                    </article>
                )
            })}
        </section>
    )
}

export default MensClothing;
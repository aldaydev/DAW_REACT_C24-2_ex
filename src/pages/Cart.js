import { useEffect, useState } from "react";
import { getCount, cartProds } from "../utils/utils";


const Cart = ()=>{

    const [cartProducts, setCartProducts] = useState([]);
    const [cartTitle, setCartTitle] = useState('TUS PRODUCTOS APARECERÁN AQUÍ');
    const [finalPrice, setFinalPrice] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const productList = Object.keys(localStorage);

        console.log('PRODUCTLIST', productList);
        
        const newCartProducts = [];
        productList.forEach((id)=>{
            newCartProducts.push(JSON.parse(localStorage[id]))
        })
        setCartProducts(newCartProducts);
    },[]);

    useEffect(()=>{
        setFinalPrice(()=>{
            return cartProducts.reduce((acc, curr)=>{
                    acc += curr.price;
                return acc;
            },0)
        })
    },[cartProducts])

    useEffect(()=>{
        localStorage.length < 1 
            ? setCartTitle('TUS PRODUCTOS APARECERÁN AQUÍ')
            : setCartTitle('TUS PRODUCTOS');
    },[cartProducts, cartTitle])

    function deleteFromCart(product, e, index){
        localStorage.removeItem(product.id);
        const updatedCart = [...cartProducts];
        updatedCart.splice(index,1);
        setCartProducts(updatedCart);
        setFinalPrice(()=>finalPrice - product.price);
    }

    const makeCount = (product, index, operation, id)=>{
        const updatedProduct = getCount(product, index, operation, id);
        
        const updatedProducts = [...cartProducts];
        updatedProducts.splice(index,1,updatedProduct);
        setCartProducts(updatedProducts);
        cartProds(product);
        let newCart = [...cart, product.id];
        setCart([newCart]);

        console.log('updatedProduct',updatedProduct);
    }

    return(
        <section>
            <h3>{cartTitle}</h3>

            {cartProducts.map((product, index)=>{
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

            {finalPrice > 0 && 
            <aside>
                <ul>
                    {Object.keys(localStorage).length > 0 && cartProducts.map((product, index)=>{
                        return(
                            <li key={`finalProd-${index}`} className="finalCart-item">{`${product.title} - ${product.price}€`}</li>
                        )
                    })}
                    {finalPrice > 0 && <li>{`Total: ${finalPrice}€`}</li>}
                </ul>
            </aside>}
            

        </section>
    )
}

export default Cart;
import { useEffect, useState } from "react";
import { getCount, cartProds } from "../utils/utils";


const Cart = ()=>{

    const [cartProducts, setCartProducts] = useState([]);
    const [cartTitle, setCartTitle] = useState('TUS PRODUCTOS APARECERÁN AQUÍ');
    const [finalPrice, setFinalPrice] = useState([]);
    // const [cart, setCart] = useState([]);

    useEffect(()=>{
        const productList = Object.keys(localStorage);
        
        const newCartProducts = [];
        productList.forEach((id)=>{
            newCartProducts.push(JSON.parse(localStorage[id]))
        })
        setCartProducts(newCartProducts);
    },[]);

    useEffect(()=>{
        setFinalPrice(()=>{
            return cartProducts.reduce((acc, curr)=>{
                    let num = (curr.price * curr.count);
                    acc = parseFloat((acc + num).toFixed(3));
                return acc;
            },0)
        })
    },[cartProducts])

    useEffect(()=>{
        localStorage.length < 1 
            ? setCartTitle('TUS PRODUCTOS APARECERÁN AQUÍ')
            : setCartTitle('TUS PRODUCTOS');
    },[cartProducts, cartTitle])

    function deleteFromCart(product, index){
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
        // cartProds(product);
        // let newCart = [...cart, product.id];
        // setCart([newCart]);
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
                            <button onClick={()=>deleteFromCart(product, index)}>ELIMINAR</button>
                            {/* <button 
                                onClick={()=>cartProducts(product)}>
                                {localStorage[product.id] ? 'Quitar del carrito' : 'Añadir al carrito'}
                            </button> */}
                        </div>
                        
                    </article>
                )
            })}

            {Object.keys(localStorage).length > 0 && 
            <aside>
                <ul>
                    {Object.keys(localStorage).length > 0 && cartProducts.map((product, index)=>{
                        if (product.count > 0){
                            return(
                                <li key={`finalProd-${index}`} className="finalCart-item">
                                    <p>{`${product.title}`}</p>
                                    <p>{`Cantidad: ${product.count}`}</p>
                                    <p>{`Precio: ${product.price * product.count}€`}</p>
                                </li>
                            )
                        }else{
                            return null;
                        }
                        // return(
                        //     <li key={`finalProd-${index}`} className="finalCart-item">
                        //         <p>{`${product.title}`}</p>
                        //         <p>{`Cantidad: ${product.count}`}</p>
                        //         <p>{`Precio: ${product.price * product.count}€`}</p>
                        //     </li>
                        // )
                    })}
                    {finalPrice > 0 && <ul>
                        <li>{`Total: ${finalPrice}€`}</li>
                        <li>{`IVA: ${parseFloat((finalPrice * 0.21).toFixed(3))}€`}</li>
                        <li>{`Precio FINAL: ${parseFloat((finalPrice * 0.21 + finalPrice).toFixed(3))} €`}</li>
                    </ul>}
                </ul>
            </aside>}
            

        </section>
    )
}

export default Cart;
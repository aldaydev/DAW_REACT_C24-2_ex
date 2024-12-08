import { useContext, useEffect, useState } from "react";
import { getCount } from "../utils/utils";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom"


const Cart = ()=>{

    const { setCartNumber, loggedIn } = useContext(DataContext);

    const [cartProducts, setCartProducts] = useState([]);
    const [cartTitle, setCartTitle] = useState('TUS PRODUCTOS APARECERÁN AQUÍ');
    const [finalPrice, setFinalPrice] = useState([]);

    useEffect(()=>{
        const productList = Object.keys(localStorage);
        
        const newCartProducts = [];
        productList.forEach((id)=>{
            newCartProducts.push(JSON.parse(localStorage[id]))
        })
        setCartProducts(newCartProducts);
    },[]);

    useEffect(()=>{
        const main = document.querySelector('.App-main');
        main.scrollTop = 0;
    },[])

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
        setCartNumber(Object.keys(localStorage).length);
    }

    const makeCount = (product, index, operation, id)=>{
        const updatedProduct = getCount(product, operation, id);
        
        const updatedProducts = [...cartProducts];
        updatedProducts.splice(index,1,updatedProduct);
        setCartProducts(updatedProducts);
    }

    return(
        <div className="cart-container">
            <section className="cartProducts">
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
                            </div>
                        </article>
                    )
                })}
            </section>
            
            <aside className="cartAside">
                <ul className="cartAside-list">
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
                    })}
                </ul>
                {finalPrice > 0 && <ul>
                        <li>{`Total: ${finalPrice}€`}</li>
                        <li>{`IVA: ${parseFloat((finalPrice * 0.21).toFixed(3))}€`}</li>
                        <li>{`Precio FINAL: ${parseFloat((finalPrice * 0.21 + finalPrice).toFixed(3))} €`}</li>
                </ul>}
                {loggedIn 
                    ? <button>REALIZAR PEDIDO</button>
                    : <div>
                        <p>Accede a tu cuenta o crea una para realizar tu pedido</p>
                        <button>
                            <Link to="/user">REGÍSTRATE</Link>
                        </button>
                    </div>}
            </aside>
        </div>
        
    )
}

export default Cart;
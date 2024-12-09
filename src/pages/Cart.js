import { useContext, useEffect, useState } from "react";
import { getCount } from "../utils/utils";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom"
import { productStars } from "../utils/utils";
import  cart_remove_icon from "../assets/img/icons/cart_remove_icon.svg";
import  cart_add_icon from "../assets/img/icons/cart_add_icon.svg";
import  cart_delete_icon from "../assets/img/icons/cart_delete_icon.svg"


const Cart = ()=>{

    const { setCartNumber, loggedIn, cartNumber } = useContext(DataContext);

    const [cartProducts, setCartProducts] = useState([]);
    const [cartTitle, setCartTitle] = useState('TUS PRODUCTOS APARECERÁN AQUÍ');
    const [finalPrice, setFinalPrice] = useState(0);

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
        <section className="cart-container">
            <section className="cart-main">
                <h1 className="cartMain-header">{cartTitle}</h1>

                <section className="cartMain-products">
                    {cartProducts.map((product, index)=>{
                        return(
                            <article key={`article-${index}`} className="cartMain-product">
                                <article className="cartMain-leftContainer">
                                    <div className="cartMain-imgContainer">
                                        <img src={product.image} className="cartMain-img" alt={`Imagen de ${product.title}`}/>
                                    </div>
                                    <div className="rate-group">
                                        {productStars(product.rating.rate)}
                                        {/* <span className="rating-info">{`${product.rating.rate} estrellas de ${product.rating.count} usuarios`}</span> */}
                                    </div>
                                </article>
                                
                                <article className="cartMain-rigthContainer">
                                    <h2 className="cartMain-title">{product.title}</h2>
                                    
                                    <p className="cartMain-description">{product.description}</p>
                                    
                                    <div className="rigthContainer-downContainer">
                                        <div className="product-handleCart product-handleCart--cart">
                                            <button onClick={()=>makeCount(product, index, 'restar', product.id)} className="handleCart-btn handleCart-btn--remove">
                                                <img src={cart_remove_icon} alt="Cart remove icon" className="handleCart-icon"/>
                                            </button>

                                            <h3 className="handleCart-count">{product.count}</h3>

                                            <button onClick={()=>makeCount(product, index, 'sumar', product.id)} className="handleCart-btn handleCart-btn--add">
                                                <img src={cart_add_icon} alt="Cart add icon" className="handleCart-icon"/>
                                            </button>
                                        </div>
                                        <h3 className="product-price product-price--cart">{`PRICE: ${parseFloat((product.price * product.count).toFixed(2))}€`}</h3>
                                        <div className="deleteFromCart-container">
                                            <button onClick={()=>deleteFromCart(product, index)} className="deleteFromCart-btn">
                                                <img src={cart_delete_icon} alt="Delete drom cart icon" className="deleteFromCart-img"/>
                                            </button>
                                        </div>
                                        
                                    </div>

                                    
                                </article>
                                
                            </article>
                        )
                    })}
                </section>
                
            </section>
            
            <aside className="cartAside">
                <ul className="cartAside-list">
                    {cartNumber > 0 && cartProducts.map((product, index)=>{
                        return(
                            <li key={`finalProd-${index}`} className="finalCart-item">
                                {/* <p>{`${product.title}`}</p> */}
                                <div className="finalCart-imgContainer">
                                    <img src={product.image} className="finalCart-img" alt={`Imagen de ${product.title}`}/>
                                </div>
                                <div className="finalCart-dataContainer">
                                    <p>{`Cantidad: ${product.count}`}</p>
                                    <p>{`Precio: ${parseFloat(product.price * product.count).toFixed(2)}€`}</p>
                                </div>
                                
                            </li>
                        )
                        // if (product.count > 0){
                        //     return(
                        //         <li key={`finalProd-${index}`} className="finalCart-item">
                        //             {/* <p>{`${product.title}`}</p> */}
                        //             <div className="finalCart-imgContainer">
                        //                 <img src={product.image} className="finalCart-img" alt={`Imagen de ${product.title}`}/>
                        //             </div>
                        //             <div className="finalCart-dataContainer">
                        //                 <p>{`Cantidad: ${product.count}`}</p>
                        //                 <p>{`Precio: ${parseFloat(product.price * product.count).toFixed(2)}€`}</p>
                        //             </div>
                                    
                        //         </li>
                        //     )
                        // }else{
                        //     return null;
                        // }
                    })}
                </ul>
                {/*REVISAR SI SE PUEDE QUITAR*/}
                {cartNumber > 0 && <ul className="finalPrice-list">
                        <li className="finalPrice-price">{`Total: ${finalPrice}€`}</li>
                        <li className="finalPrice-tax">{`IVA: ${parseFloat((finalPrice * 0.21).toFixed(2))}€`}</li>
                        <li className="finalPrice-total">Precio FINAL: 
                            <b>{` ${parseFloat((finalPrice * 0.21 + finalPrice).toFixed(2))} €`}</b>
                        </li>
                </ul>}
                {loggedIn 
                    ? <button className="cartBuy-btn">
                            <Link to="/user">REALIZAR PEDIDO</Link>
                        </button>
                    : <div>
                        <p className="cartBuy-register">Accede a tu cuenta o crea una para realizar tu pedido</p>
                        <button className="cartBuy-btn">
                            <Link to="/user">REGÍSTRATE</Link>
                        </button>
                    </div>}
            </aside>
        </section>
        
    )
}

export default Cart;
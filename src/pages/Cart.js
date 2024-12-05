import { useEffect, useState } from "react";

const Cart = ()=>{

    const [cartProducs, setCartProducts] = useState([]);
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
        setFinalPrice(()=>{
            return cartProducs.reduce((acc, curr)=>{
                    acc += curr.price;
                return acc;
            },0)
        })
    },[cartProducs])

    useEffect(()=>{
        if(localStorage.length < 1){
            setCartTitle('TUS PRODUCTOS APARECERÁN AQUÍ');
        }else{
            setCartTitle('TUS PRODUCTOS');
        }
    },[cartProducs, cartTitle])

    function deleteFromCart(product, e){
        const updatedCart = [...cartProducs];
        setCartProducts(updatedCart);
        setFinalPrice(finalPrice - product.price)
        localStorage.removeItem(product.id);
        e.target.parentElement.remove();
    }

    return(
        <section>
            <h3>{cartTitle}</h3>

            {cartProducs.map((product, index)=>{
                return(
                    <article key={`article${index}`} className="main-sec-article">
                        <h3 className="article-title">{product.title}</h3>
                        <div className="article-imgContainer">
                            <img src={product.image} className="article-img" alt={`Imagen del producto ${product.title}`}/>
                        </div>
                        <span>{`ID: ${product.id}`}</span>
                        <p>{product.description}</p>
                        {/* <span>{`RATING: ${product.rating.rate}`}</span> */}
                        <h3>{`PRICE: ${product.price}€`}</h3>
                        <button onClick={(e)=>deleteFromCart(product,e)}>Eliminar del carrito</button>
                    </article>
                )
            })}

            {finalPrice > 0 && 
            <aside>
                <ul>
                    {cartProducs.map((product, index)=>{
                        return(
                            <li key={`finalProd-${index}`} className="finalCart-item">{`${product.title} - ${product.price}€`}</li>
                        )
                    })}
                    <li>{`Total: ${finalPrice}€`}</li>
                </ul>
            </aside>}
            

        </section>
    )
}

export default Cart;
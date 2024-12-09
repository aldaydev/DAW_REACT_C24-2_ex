import { useEffect } from "react";
import { useState } from "react";
import { getCount, productStars } from "../utils/utils";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import cart_add_icon from "../assets/img/icons/cart_add_icon.svg";
import cart_remove_icon from "../assets/img/icons/cart_remove_icon.svg";

const CatSection = ({url, title})=>{

    const {setCartNumber} = useContext(DataContext);

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const main = document.querySelector('.App-main');
        main.scrollTop = 0;
    },[])

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
        <section className="main-sec">
            <h1 className="main-sec-title">{title}</h1>
            <section className="main-sec-products">
                {products.map((product, index)=>{
                    return(
                        <article key={`article-${index}`} className="product-container">
                            <header>
                                <div className="product-imgContainer">
                                    <img src={product.image} className="product-img" alt={`Imagen de ${product.title}`}/>

                                </div>
                            <h3 className="product-title">{product.title}</h3>
                            </header>
                            
                            <div className="product-decriptionContainer" tabIndex="0">
                                <p className="product-description">{product.description}</p>
                            </div>

                            <div className="rate-group">
                                {productStars(product.rating.rate)}
                                <span className="rating-info">{`${product.rating.rate} estrellas de ${product.rating.count} usuarios`}</span>
                            </div>
                            
                            
                            <h3 className="product-price">{`PRICE: ${product.price}€`}</h3>
                            <div className="product-handleCart">
                                <button onClick={()=>makeCount(product, index, 'restar', product.id)} className="handleCart-btn handleCart-btn--remove">
                                    <img src={cart_remove_icon} alt="Cart remove icon" className="handleCart-icon"/>
                                </button>

                                <h3 className="handleCart-count">{product.count}</h3>

                                <button onClick={()=>makeCount(product, index, 'sumar', product.id)} className="handleCart-btn handleCart-btn--add">
                                    <img src={cart_add_icon} alt="Cart add icon" className="handleCart-icon"/>
                                </button>
                                
                                
                            </div>
                            
                        </article>
                    )
                })}
            </section>
            
        </section>
    )
}

export default CatSection;
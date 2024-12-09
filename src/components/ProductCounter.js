import { useState, useEffect } from "react";
import { getCount } from "../utils/utils";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import cart_add_icon from "../assets/img/icons/cart_add_icon.svg";
import cart_remove_icon from "../assets/img/icons/cart_remove_icon.svg";

const ProductCounter = ({product, index, url})=>{

    const {setCartNumber} = useContext(DataContext);

    const [products, setProducts] = useState([]);

    const makeCount = (product, index, operation, id)=>{
        //Obtendo el objeto de producto + count
        const updatedProduct = getCount(product, operation, id);

        const updatedProducts = [...products];
        updatedProducts.splice(index,1,updatedProduct);
        setProducts(updatedProducts);
        setCartNumber(localStorage.length);
    }

    return(
        <div className="product-handleCart">
            <button onClick={()=>makeCount(product, index, 'restar', product.id)} className="handleCart-btn handleCart-btn--remove">
                <img src={cart_remove_icon} alt="Cart remove icon" className="handleCart-icon"/>
            </button>

            <h3 className="handleCart-count">{product.count}</h3>

            <button onClick={()=>makeCount(product, index, 'sumar', product.id)} className="handleCart-btn handleCart-btn--add">
                <img src={cart_add_icon} alt="Cart add icon" className="handleCart-icon"/>
            </button>
        </div>            
    )
}

export default ProductCounter;
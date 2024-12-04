import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import cart_img from "./img/cart_img.png"

const HeaderNav = ()=>{

    const [categories, setCategories] = useState([]);

    useEffect(()=>{

        async function getCategories(){
            let response = await fetch('https://fakestoreapi.com/products/categories');
            let LoadedCategories = await response.json();
            setCategories(LoadedCategories);
        }

        getCategories();
    },[])


    return(
        <nav className="header-nav">
            <ul className="nav-list">
                {categories.map((category, index)=>{
                    let catName = category.toUpperCase();
                    let catDir = category.toLowerCase().split("").filter((char)=>{
                        return char !== " " && char !== "'";
                    });
                    catDir = catDir.join('');
                    
                    return (
                        <li key={`link-${index}`} className="nav-item">
                            {/* <span>{catDir + " " + catName}</span> */}
                            <Link to={`/${catDir}`}>{catName}</Link>
                        </li>
                    )
                })}
                <li className="nav-item nav-item--cart">
                    <Link to='/cart'>
                        <div className="cart-logoContainer">
                            <img src={cart_img} alt="cart icon" className="cart-logo"/>
                        </div>
                    </Link>
                </li>
            </ul>
            
        </nav>
    )
}

export default HeaderNav;
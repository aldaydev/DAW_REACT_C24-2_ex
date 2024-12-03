import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const HeaderNav = ()=>{

    const [categories, setCategories] = useState([]);

    useEffect(()=>{

        async function getCategories(){
            let response = await fetch('https://fakestoreapi.com/products/categories');
            let LoadedCategories = await response.json();
            setCategories(LoadedCategories);
        }

        getCategories();
        console.log(categories);
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
                    
                    console.log(catDir);
                    return (
                        <li key={`link-${index}`} className="nav-item">
                            {/* <span>{catDir + " " + catName}</span> */}
                            <Link to={`/${catDir}`}>{catName}</Link>
                        </li>
                    )
                })}
                <li className="nav-item nav-item--cart">
                    <Link to='/cart'>CART</Link>
                </li>
            </ul>
            
        </nav>
    )
}

export default HeaderNav;
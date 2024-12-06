import { Link } from "react-router-dom"
import cart_img from "./img/cart_img.png"
import { DataContext } from "../context/DataContext"
import { useContext } from "react"

const HeaderNav = ({catList})=>{

    const {cartNumber} = useContext(DataContext);

    return(
        <nav className="header-nav">
            <ul className="nav-list">
                {catList.map((category, index)=>{
                    
                    return (
                        <li key={`link-${index}`} className="nav-item">
                            <Link to={`/${category[1]}`}>{category[0]}</Link>
                        </li>
                    )
                })}
                <li className="nav-item nav-item--cart">
                    <Link to='/cart'>
                        <div className="cart-logoContainer">
                            <img src={cart_img} alt="cart icon" className="cart-logo"/>
                            {Object.keys(localStorage).length > 0 && <span style={{color: 'black'}}>{cartNumber}</span>}
                        </div>
                    </Link>
                </li>
            </ul>
            
        </nav>
    )
}

export default HeaderNav;
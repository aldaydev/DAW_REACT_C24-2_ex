import { Link } from "react-router-dom"
import cart_img from "./img/cart_img.png"
import user_icon from "./img/user_icon.png"
import login_icon from "./img/login_icon.png"
import { DataContext } from "../context/DataContext"
import { useContext } from "react"

const HeaderNav = ({catList})=>{

    const {cartNumber} = useContext(DataContext);

    return(
        <nav className="header-nav">
            <ul className="nav-catList">
                {catList.map((category, index)=>{
                    
                    return (
                        <li key={`link-${index}`} className="nav-catItem">
                            <Link to={`/${category[1]}`}>{category[0]}</Link>
                        </li>
                    )
                })}
            </ul>
            <ul className="nav-userList">
                <li className="nav-userItem">
                    <Link to='/cart'>
                        <div className="nav-user">
                            <img src={login_icon} alt="cart icon" className="user-icon"/>
                        </div>
                    </Link>
                </li>
                <li className="nav-userItem">
                    <Link to='/cart'>
                        <div className="nav-cart">
                            <img src={cart_img} alt="cart icon" className="cart-icon"/>
                            {Object.keys(localStorage).length > 0 && <span className="cart-count">{cartNumber}</span>}
                        </div>
                    </Link>
                </li>
            </ul>
            
        </nav>
    )
}

export default HeaderNav;
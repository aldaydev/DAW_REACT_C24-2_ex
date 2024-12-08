import { Link } from "react-router-dom"
import cart_icon from "../../assets/img/icons/cart_icon.svg"
import login_icon from "../../assets/img/icons/login_icon.svg"
import user_icon from "../../assets/img/icons/user_icon.svg"
import notifications_icon from "../../assets/img/icons/notifications_icon.svg"
import { DataContext } from "../../context/DataContext"
import { useContext } from "react"

const HeaderNav = ({catList})=>{

    const {cartNumber, loggedIn} = useContext(DataContext);

    return(
        <nav className="header-nav">

            <ul className="nav-catList">
                {catList.map((category, index)=>{
                    
                    return (
                        <li key={`link-${index}`} className="nav-catItem">
                            <Link to={`/${category[1]}#`}>{category[0]}</Link>
                        </li>
                    )
                })}
            </ul>
            
            <ul className="nav-userList">
                <li className="nav-userItem">
                    <Link to='/user'>
                        <div className="nav-user">
                            {loggedIn 
                                ? <>
                                <img src={user_icon} alt="cart icon" className="user-icon"/> 
                                </>
                                : <img src={login_icon} alt="cart icon" className="user-icon"/>
                            }
                        </div>
                    </Link>
                </li>
                {loggedIn && <li className="nav-userItem">
                    <div className="nav-not">
                        <img src={notifications_icon} alt="Notifications icon" className="not-icon"/>
                    </div>
                    </li>}
                <li className="nav-userItem">
                    <Link to='/cart'>
                        <div className="nav-cart">
                            <img src={cart_icon} alt="cart icon" className="cart-icon"/>
                            {Object.keys(localStorage).length > 0 && <span className="cart-count">{cartNumber}</span>}
                        </div>
                    </Link>
                </li>
            </ul>
            
        </nav>
    )
}

export default HeaderNav;
import { Link } from "react-router-dom";
import HeaderNav from "./HeaderNav";

const Header = ()=>{
    return(
        <header className="App-header">
            <div className="header-logo">
                <Link to='/'>TIENDA ONLINE</Link>
            </div>
            <HeaderNav/>
        </header>
    )
}

export default Header;
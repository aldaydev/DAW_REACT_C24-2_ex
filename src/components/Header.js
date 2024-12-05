import { Link } from "react-router-dom";
import HeaderNav from "./HeaderNav";

const Header = ({catList})=>{

    return(
        <header className="App-header">
            <div className="header-logo">
                <Link to='/'>TIENDA ONLINE</Link>
            </div>
            <HeaderNav catList={catList}/>
        </header>
    )
}

export default Header;
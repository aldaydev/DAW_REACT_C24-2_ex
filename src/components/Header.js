import { Link } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Header = ()=>{

    const {categories} = useContext(DataContext);

    return(
        <header className="App-header">
            <div className="header-logo">
                <Link to='/'>TIENDA ONLINE</Link>
            </div>
            <HeaderNav catList={
                categories.reduce((acc,curr)=>{
                    let catArr = [];
                    catArr.push(curr[0]);
                    catArr.push(curr[1]);
                    acc.push(catArr);
                    return acc;
                }, [])}
                />
        </header>
    )
}

export default Header;
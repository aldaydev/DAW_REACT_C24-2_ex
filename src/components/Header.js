import { Link } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import fakestore_logo from "./img/fakestore_logo.png"

const Header = ()=>{

    const {categories} = useContext(DataContext);

    return(
        <header className="App-header">
            <div className="header-brand">
                <Link to='/'>
                    <div className="brand-container">
                        <img src={fakestore_logo} alt="Fake Store Logo" className="brand-logo"/>
                        <div className="brand-text">
                            <h3 className="brand-title">FAKE 
                                <span className="brand-title brand-title--mod"> STORE</span>
                            </h3>
                            <h5 className="brand-subtitle">RAFA ALDAY DEV</h5>
                        </div>
                    </div>
                </Link>
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
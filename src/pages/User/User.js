import { useContext, useEffect } from "react"
import { DataContext } from "../../context/DataContext"
import Login from "./components/Login";
import Account from "./components/Account";

const User = ()=>{

    const {loggedIn} = useContext(DataContext);

    useEffect(()=>{
        const main = document.querySelector('.App-main');
        main.scrollTop = 0;
    },[])

    return (
        <>
        {!loggedIn ? <Login/> : <Account/>}
        </>
    )
}

export default User;
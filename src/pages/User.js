import { useContext } from "react"
import { DataContext } from "../context/DataContext"
import Login from "./Login";
import Account from "./Account";

const User = ()=>{

    const {loggedIn} = useContext(DataContext);

    return (
        <>
        {!loggedIn ? <Login/> : <Account/>}
        </>
    )
}

export default User;